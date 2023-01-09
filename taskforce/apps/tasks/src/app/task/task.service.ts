import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Task, TaskStatus, UserRole } from '@taskforce/shared-types';
import { FeedbackRepository } from '../feedback/feedback.repository';
import { AssignContractorDto } from './dto/assign-contractor.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import {
  ALLOWED_STATUS_CHANGES,
  ALLOWED_STATUS_CHANGES_BY_ROLE,
  CHANGE_STATUS_NOT_VALID,
  CHANGE_STATUS_ROLE_NOT_VALID,
} from './task.constant';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly feedbackRepository: FeedbackRepository
  ) {}

  public async getTask(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  public async createTask(dto: CreateTaskDto): Promise<Task> {
    const newTaskEntity = new TaskEntity(dto);
    return await this.taskRepository.create(newTaskEntity);
  }

  public async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (task.customerId !== dto.customerId) {
      throw new BadRequestException('Нельзя редактировать чужую задачу.');
    }
    const updatedTaskEntity = new TaskEntity(dto);
    return await this.taskRepository.update(id, updatedTaskEntity);
  }

  public async deleteTask(id: number, customerId: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    if (task.customerId !== customerId) {
      throw new BadRequestException('Нельзя удалять чужую задачу.');
    }
    await this.taskRepository.delete(id);
  }

  public async getTasks(query: TaskQuery): Promise<Task[]> {
    return await this.taskRepository.find(query);
  }

  public async changeStatus(
    dto: ChangeStatusDto,
    role: UserRole
  ): Promise<Task> {
    const { taskId, newStatus } = dto;
    const task = await this.taskRepository.findById(taskId);

    const isAvailableChange = this.checkStatusChange(
      task.status,
      newStatus as TaskStatus
    );

    const isValidChangeByRole = ALLOWED_STATUS_CHANGES_BY_ROLE[role].includes(
      newStatus as TaskStatus
    );

    if (!isValidChangeByRole) {
      throw new ForbiddenException(CHANGE_STATUS_ROLE_NOT_VALID);
    }

    if (!isAvailableChange) {
      throw new BadRequestException(CHANGE_STATUS_NOT_VALID);
    }

    const updatedTaskEntity = new TaskEntity({
      ...task,
      status: newStatus as TaskStatus,
    });
    return await this.taskRepository.update(taskId, updatedTaskEntity);
  }

  public async assignContractor(
    dto: AssignContractorDto,
    customerId: string
  ): Promise<Task> {
    const { taskId, contractorId } = dto;
    const task = await this.taskRepository.findById(taskId);
    if (task.customerId !== customerId) {
      throw new BadRequestException('Нельзя редактировать чужую задачу.');
    }
    const taskFeedbacks = await this.feedbackRepository.findByTaskId(taskId);
    const isValidAssign = taskFeedbacks.find(
      (feedback) => feedback.contractorId === contractorId
    );

    if (!isValidAssign) {
      throw new BadRequestException(
        'Назначать исполнителя можно только из списка откликнувшихся'
      );
    }

    const contractorTasks = await this.taskRepository.findByContractorId(
      contractorId
    );

    const isInvalidContractor = contractorTasks.find(
      (task) => task.status === TaskStatus.Process
    );

    if (isInvalidContractor) {
      throw new BadRequestException(
        'Нельзя назначить исполнителя, у которого есть задача в работе'
      );
    }

    const newStatus = TaskStatus.Process;
    const isAvailableChange = this.checkStatusChange(task.status, newStatus);

    if (!isAvailableChange) {
      throw new BadRequestException(CHANGE_STATUS_NOT_VALID);
    }

    const updatedTaskEntity = new TaskEntity({
      ...task,
      contractorId,
      status: newStatus,
    });
    return this.taskRepository.update(taskId, updatedTaskEntity);
  }

  public async getMyTasks(
    userId: string,
    role: string,
    status: TaskStatus
  ): Promise<Task[]> {
    if (role === UserRole.Contractor) {
      return this.taskRepository.findByContractorId(userId, status);
    }
    return this.taskRepository.findByCustomerId(userId, status);
  }

  public async updateImage(
    id: number,
    customerId: string,
    dto: UpdateImageDto
  ): Promise<Task> {
    const { image } = dto;
    const task = await this.taskRepository.findById(id);
    if (task.customerId !== customerId) {
      throw new BadRequestException('Нельзя редактировать чужую задачу.');
    }
    const imagePath = `http://${process.env.HOST}:${process.env.PORT}/${process.env.UPLOAD_DEST}/${image}`;
    const updatedTaskEntity = await new TaskEntity({
      ...task,
      image: imagePath,
    });
    return this.taskRepository.update(id, updatedTaskEntity);
  }

  private checkStatusChange(
    currentStatus: TaskStatus,
    newStatus: TaskStatus
  ): boolean {
    return ALLOWED_STATUS_CHANGES[currentStatus].includes(newStatus);
  }
}

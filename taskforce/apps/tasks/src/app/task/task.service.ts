import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@taskforce/core';
import {
  SubscribeEvent,
  Task,
  TaskStatus,
  UserRole,
} from '@taskforce/shared-types';
import { FeedbackRepository } from '../feedback/feedback.repository';
import { AssignContractorDto } from './dto/assign-contractor.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotifyDto } from './dto/notify.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import {
  ALLOWED_STATUS_CHANGES,
  ALLOWED_STATUS_CHANGES_BY_ROLE,
  RABBITMQ_SERVICE_NAME,
  TASK_EXCEPTION_MESSAGE,
} from './task.constant';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

const {
  CHANGE_STATUS_NOT_VALID,
  CHANGE_STATUS_ROLE_NOT_VALID,
  TASK_NOT_FOUND,
  FOREIGN_TASK_UPDATE,
  FOREIGN_TASK_DELETE,
  FEEDBACK_CONTRACTOR,
  PROCESS_CONTRACTOR,
} = TASK_EXCEPTION_MESSAGE;

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly feedbackRepository: FeedbackRepository,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy
  ) {}

  public async getTask(id: number): Promise<Task> {
    const existTask = await this.taskRepository.findById(id);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return existTask;
  }

  public async createTask(
    customerId: string,
    dto: CreateTaskDto
  ): Promise<Task> {
    const newTaskEntity = new TaskEntity({ ...dto, customerId });
    return await this.taskRepository.create(newTaskEntity);
  }

  public async updateTask(
    id: number,
    dto: UpdateTaskDto,
    customerId: string
  ): Promise<Task> {
    const existTask = await this.taskRepository.findById(id);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    if (existTask.customerId !== customerId) {
      throw new BadRequestException(FOREIGN_TASK_UPDATE);
    }
    const updatedTaskEntity = new TaskEntity(dto);
    return await this.taskRepository.update(id, updatedTaskEntity);
  }

  public async deleteTask(id: number, customerId: string): Promise<void> {
    const existTask = await this.taskRepository.findById(id);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    if (existTask.customerId !== customerId) {
      throw new BadRequestException(FOREIGN_TASK_DELETE);
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
    const existTask = await this.taskRepository.findById(taskId);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    const isAvailableChange = this.checkStatusChange(
      existTask.status,
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
      ...existTask,
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
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    if (task.customerId !== customerId) {
      throw new BadRequestException(FOREIGN_TASK_UPDATE);
    }
    const taskFeedbacks = await this.feedbackRepository.findByTaskId(taskId);
    const isValidAssign = taskFeedbacks.find(
      (feedback) => feedback.contractorId === contractorId
    );

    if (!isValidAssign) {
      throw new BadRequestException(FEEDBACK_CONTRACTOR);
    }

    const contractorTasks = await this.taskRepository.findByContractorId(
      contractorId
    );

    const isInvalidContractor = contractorTasks.find(
      (task) => task.status === TaskStatus.Process
    );

    if (isInvalidContractor) {
      throw new BadRequestException(PROCESS_CONTRACTOR);
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
    status?: TaskStatus
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
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    if (task.customerId !== customerId) {
      throw new BadRequestException(FOREIGN_TASK_UPDATE);
    }
    const imagePath = `http://${process.env.HOST}:${process.env.PORT}/${process.env.UPLOAD_DEST}/${image}`;

    const updatedTaskEntity = await new TaskEntity({
      ...task,
      image: imagePath,
    });
    return this.taskRepository.update(id, updatedTaskEntity);
  }

  public async getNotify(dto: NotifyDto): Promise<void> {
    const { lastNotify, email } = dto;

    const tasks = await this.taskRepository.findForNotify(lastNotify);
    this.rabbitClient.emit(createEvent(SubscribeEvent.GetTasks), {
      email,
      tasks,
    });
  }

  public async getCounter(
    userId: string,
    status?: TaskStatus
  ): Promise<number> {
    const {
      _count: { id: count },
    } = await this.taskRepository.getCounter(userId, status);
    return count;
  }

  private checkStatusChange(
    currentStatus: TaskStatus,
    newStatus: TaskStatus
  ): boolean {
    return ALLOWED_STATUS_CHANGES[currentStatus].includes(newStatus);
  }
}

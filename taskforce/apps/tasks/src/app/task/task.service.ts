import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Task, TaskStatus, UserRole } from '@taskforce/shared-types';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
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
  constructor(private readonly taskRepository: TaskRepository) {}

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

    const currentStatus = task.status;

    const isAvailableChange = ALLOWED_STATUS_CHANGES[currentStatus].includes(
      newStatus as TaskStatus
    );

    const isValidChangeByRole = ALLOWED_STATUS_CHANGES_BY_ROLE[role].includes(
      newStatus as TaskStatus
    );

    if (!isValidChangeByRole) {
      throw new ForbiddenException(CHANGE_STATUS_ROLE_NOT_VALID);
    }

    if (isAvailableChange) {
      const updatedTaskEntity = new TaskEntity({
        ...task,
        status: newStatus as TaskStatus,
      });
      return await this.taskRepository.update(taskId, updatedTaskEntity);
    } else {
      throw new BadRequestException(CHANGE_STATUS_NOT_VALID);
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { Task, TaskStatus, UserRole } from '@taskforce/shared-types';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import {
  ALLOWED_STATUS_CHANGES,
  CHANGE_STATUS_NOT_VALID,
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
    const updatedTaskEntity = new TaskEntity(dto);
    return await this.taskRepository.update(id, updatedTaskEntity);
  }

  public async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  public async getTasks(query: TaskQuery): Promise<Task[]> {
    return await this.taskRepository.find(query);
  }

  public async changeStatus(
    dto: ChangeStatusDto,
    role: UserRole
  ): Promise<Task> {
    console.log(role);
    const { taskId, newStatus } = dto;
    const task = await this.taskRepository.findById(taskId);

    const currentStatus = task.status;

    const isAvailableChange = ALLOWED_STATUS_CHANGES[currentStatus].includes(
      newStatus as TaskStatus
    );

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

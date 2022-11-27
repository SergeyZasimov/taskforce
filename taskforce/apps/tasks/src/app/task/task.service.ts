import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskMemoryRepository } from './task.memory.repository';
import * as dayjs from 'dayjs';
import { Task } from '@taskforce/shared-types';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskMemoryRepository: TaskMemoryRepository) {}

  public async getTask(id: string): Promise<Task> | null {
    return await this.taskMemoryRepository.findById(id);
  }

  public async getByCategory(category: string): Promise<Task[]> | null {
    return await this.taskMemoryRepository.findAllByCategory(category);
  }

  public async createTask(dto: CreateTaskDto): Promise<Task> {
    const {
      title,
      description,
      category,
      address,
      executionTerm,
      price,
      tags,
    } = dto;

    const newTask = {
      title,
      description,
      category,
      address,
      executionTerm: dayjs(executionTerm).toDate(),
      price,
      tags,
    };

    const taskEntity: TaskEntity = await new TaskEntity(newTask);

    return await this.taskMemoryRepository.create(taskEntity);
  }

  public async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> | null {
    return await this.taskMemoryRepository.update(id, dto);
  }

  public async deleteTask(id: string): Promise<void> | null {
    return await this.taskMemoryRepository.delete(id);
  }
}

import { CRUDRepository } from '@taskforce/core';
import { Task } from '@taskforce/shared-types';
import { TaskEntity } from './task.entity';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class TaskMemoryRepository
  implements CRUDRepository<TaskEntity, string, Task>
{
  private repository: Record<string, Task>;

  public async findById(id: string): Promise<Task> | null {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }
    return null;
  }

  public async findAllByCategory(category: string): Promise<Task[]> | null {
    return await Object.values(this.repository).filter((taskItem) => {
      return (taskItem.category = category);
    });
  }

  public async create(entity: TaskEntity): Promise<Task> {
    const entry = { ...entity.toObject(), _id: crypto.randomUUID() };
    this.repository[entry._id] = entry;
    return { ...entry };
  }

  public async update(
    id: string,
    entity: Partial<TaskEntity>
  ): Promise<Task> | null {
    if (this.findById(id)) {
      const updatedTask = { ...this.repository[id], ...entity.toObject() };
      this.repository[id] = updatedTask;
      return { ...updatedTask };
    }
    return null;
  }

  public async delete(id: string): Promise<void> | null {
    if (this.findById(id)) {
      delete this.repository[id];
      return;
    }
    return null;
  }
}

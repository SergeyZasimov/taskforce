import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { UserEntity } from './user.entity';

@Injectable()
export class UserMemoryRepository
  implements CRUDRepository<UserEntity, number, User>
{
  private repository: Record<string, User> = {};

  public async findById(id: number): Promise<User> | null {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }
    return null;
  }

  public async findByEmail(email: string): Promise<User> | null {
    const existUser = Object.values(this.repository).find((userItem) => {
      userItem.email === email;
    });

    if (existUser) {
      return { ...existUser };
    }
    return null;
  }

  public async create(entity: UserEntity): Promise<User> {
    const entry = { ...entity.toObject(), id: parseInt(crypto.randomUUID()) };
    this.repository[entry.id] = entry;
    return { ...entry };
  }

  public async update(
    id: number,
    entity: Partial<UserEntity>
  ): Promise<User> | null {
    if (this.findById(id)) {
      const newItem = { ...this.repository[id], ...entity };
      this.repository[id] = newItem;
      return { ...newItem };
    }
    return null;
  }

  public async delete(id: number): Promise<void> | null {
    if (this.findById(id)) {
      delete this.repository[id];
    }
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
  ) {}

  public async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  public async findByEmail(email: string): Promise<User> | null {
    return await this.userModel.findOne({ email });
  }

  public async create(entity: UserEntity): Promise<User> {
    return await this.userModel.create(entity);
  }

  public async update(
    id: string,
    entityProperties: Partial<UserEntity>
  ): Promise<User> | null {
    return await this.userModel.findByIdAndUpdate(id, entityProperties, {
      new: true,
    });
  }

  public async delete(id: string): Promise<void> | null {
    await this.userModel.deleteOne({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CRUDRepository } from '@taskforce/core';
import {
  ChangeTasksCounterDirection,
  User,
  UserRole,
} from '@taskforce/shared-types';
import { Model } from 'mongoose';
import { ChangeTaskCounterQuery } from '../../query/change-tasks-counter.query';
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

  public async findContractorById(id: string): Promise<User> | null {
    const result = await this.userModel.aggregate([
      {
        $match: {
          role: UserRole.Contractor,
        },
      },
      {
        $lookup: {
          from: 'reviews',
          let: { userId: { $toString: '$_id' } },
          pipeline: [
            { $match: { $expr: { $eq: ['$contractorId', '$$userId'] } } },
            { $project: { rating: 1 } },
          ],
          as: 'reviews',
        },
      },
      {
        $addFields: {
          rating: {
            $cond: [
              {
                $eq: [
                  { $sum: [{ $size: '$reviews' }, '$failedTasksCount'] },
                  0,
                ],
              },
              0,
              {
                $round: [
                  {
                    $divide: [
                      { $sum: '$reviews.rating' },
                      { $sum: [{ $size: '$reviews' }, '$failedTasksCount'] },
                    ],
                  },
                  1,
                ],
              },
            ],
          },
        },
      },
      { $unset: 'reviews' },
      { $sort: { rating: -1 } },
    ]);

    const userIndex = result.findIndex((user) => user._id.toString() === id);

    return { ...result[userIndex], ratingPlace: userIndex + 1 };
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

  public async changeTasksCounter(
    id: string,
    query: ChangeTaskCounterQuery
  ): Promise<User> | null {
    const { counterName, direction } = query;
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $inc: { [counterName]: +direction || ChangeTasksCounterDirection.Inc },
      },
      { new: true }
    );
  }
}

import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@taskforce/core';
import { Review } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewRepository
  implements CRUDRepository<ReviewEntity, number, Review>
{
  constructor(private readonly prisma: PrismaService) {}

  public create(entity: ReviewEntity): Promise<Review> {
    return this.prisma.review.create({
      data: entity.toObject(),
    });
  }

  public async findByTaskId(taskId: number): Promise<Review> {
    return this.prisma.review.findFirst({ where: { taskId } });
  }

  public async findByContractorId(contractorId: string): Promise<Review[]> {
    return this.prisma.review.findMany({ where: { contractorId } });
  }

  public async findForRating() {
    return await this.prisma.review.groupBy({
      by: ['contractorId'],
      _count: {
        rating: true,
      },
      _sum: {
        rating: true,
      },
    });
  }

  public findById(): Promise<Review> {
    return Promise.resolve(undefined);
  }

  public update(): Promise<Review> {
    return Promise.resolve(undefined);
  }

  public delete(): Promise<void> {
    return Promise.resolve(undefined);
  }
}

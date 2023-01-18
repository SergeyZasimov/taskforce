import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { CRUDRepository } from '@taskforce/core';
import { Feedback } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { FeedbackEntity } from './feedback.entity';

@Injectable()
export class FeedbackRepository
  implements CRUDRepository<FeedbackEntity, number, Feedback>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findByTaskId(taskId: number): Promise<Feedback[]> {
    const feedbacks = await this.prisma.feedback.findMany({
      where: { taskId },
    });

    return feedbacks.map((feedback) => ({
      ...feedback,
      price: Number(feedback.price),
    }));
  }

  public async findByTaskAndContractor(
    taskId: number,
    contractorId: string
  ): Promise<Feedback> {
    const feedback = await this.prisma.feedback.findFirst({
      where: { taskId, contractorId },
    });
    return feedback ? { ...feedback, price: Number(feedback.price) } : null;
  }

  public async create(entity: FeedbackEntity): Promise<Feedback> {
    const newFeedback = await this.prisma.feedback.create({
      data: {
        text: entity.text,
        contractorId: entity.contractorId,
        price: entity.price && new Prisma.Decimal(entity.price),
        task: { connect: { id: entity.taskId } },
      },
    });

    return { ...newFeedback, price: Number(newFeedback.price) };
  }

  public findById(): Promise<Feedback> {
    return Promise.resolve(undefined);
  }

  public update(): Promise<Feedback> {
    return Promise.resolve(undefined);
  }

  public delete(): Promise<void> {
    return Promise.resolve(undefined);
  }
}

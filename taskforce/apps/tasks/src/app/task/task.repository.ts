import { Injectable } from '@nestjs/common';
import { Prisma, Status, Tag } from '@prisma/client';
import { CRUDRepository } from '@taskforce/core';
import { AvailableCities, Task, TaskStatus } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository
  implements CRUDRepository<TaskEntity, number, Task>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findById(id: number): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: { id },
      include: {
        category: true,
        tags: true,
        _count: {
          select: { comments: true, feedbacks: true },
        },
      },
    });
    return this.convertTask(task);
  }

  public async create(entity: TaskEntity): Promise<Task> {
    const entityData = { ...entity.toObject() };
    const newTask = await this.prisma.task.create({
      data: {
        title: entityData.title,
        description: entityData.description,
        userId: entityData.userId,
        executionTerm: entityData.executionTerm,
        image: entityData.image,
        address: entityData.address,
        price: new Prisma.Decimal(entityData.price),
        category: {
          connectOrCreate: {
            where: {
              title: entityData.category.title,
            },
            create: {
              title: entityData.category.title,
            },
          },
        },
        tags: {
          connectOrCreate: [
            ...entityData.tags.map((tag) => ({
              where: {
                title: tag.title,
              },
              create: {
                title: tag.title,
              },
            })),
          ],
        },
        comments: {
          connect: [],
        },
        feedbacks: {
          connect: [],
        },
      },
      include: {
        category: true,
        tags: true,
      },
    });
    return this.convertTask(newTask);
  }

  public async update(id: number, entity: TaskEntity): Promise<Task> {
    const entityData = { ...entity.toObject() };
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        title: entityData.title,
        description: entityData.description,
        userId: entityData.userId,
        executionTerm: entityData.executionTerm,
        image: entityData.image,
        address: entityData.address,
        status: Status[entityData.status],
        price: new Prisma.Decimal(entityData.price),
        category: entityData.category.title
          ? {
              connectOrCreate: {
                where: {
                  title: entityData.category.title,
                },
                create: {
                  title: entityData.category.title,
                },
              },
            }
          : {},
        tags: {
          connectOrCreate: [
            ...entityData.tags.map((tag) => ({
              where: {
                title: tag.title,
              },
              create: {
                title: tag.title,
              },
            })),
          ],
        },
        comments: {
          connect: [],
        },
        feedbacks: {
          connect: [],
        },
      },
      include: {
        category: true,
        tags: true,
        _count: {
          select: { comments: true, feedbacks: true },
        },
      },
    });
    return this.convertTask(updatedTask);
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }

  private convertTask(prismaTask): Task {
    return {
      ...prismaTask,
      price: Number(prismaTask.price),
      status: TaskStatus[prismaTask.status],
      category: prismaTask.category.title,
      tags: prismaTask.tags.map((tag) => tag.title),
      commentsCount: prismaTask._count?.comments || 0,
      feedbacksCount: prismaTask._count?.feedbacks || 0,
    };
  }
}

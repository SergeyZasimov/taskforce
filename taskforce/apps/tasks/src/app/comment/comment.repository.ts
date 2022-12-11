import { CRUDRepository } from '@taskforce/core';
import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from './comment.entity';
import { Comment } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class CommentRepository
  implements CRUDRepository<CommentEntity, number, Comment>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findByTaskId(taskId: number): Promise<Comment[]> {
    return await this.prisma.comment.findMany({ where: { taskId } });
  }

  public async create(entity: CommentEntity): Promise<Comment> {
    return await this.prisma.comment.create({ data: { ...entity.toObject() } });
  }

  public findById(id: number): Promise<Comment> {
    return Promise.resolve(undefined);
  }

  public update(id: number, entity: CommentEntity): Promise<Comment> {
    return Promise.resolve(undefined);
  }

  public delete(id: number): Promise<void> {
    return Promise.resolve(undefined);
  }
}

import { CRUDRepository } from '@taskforce/core';
import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from './comment.entity';
import { Comment } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common/decorators';
import { DEFAULT_COMMENT_LIST_SIZE } from './comment.constant';

@Injectable()
export class CommentRepository
  implements CRUDRepository<CommentEntity, number, Comment>
{
  constructor(private readonly prisma: PrismaService) {}

  public async findByTaskId(taskId: number, page: number): Promise<Comment[]> {
    return await this.prisma.comment.findMany({
      where: { taskId },
      take: DEFAULT_COMMENT_LIST_SIZE,
      skip: page > 0 ? DEFAULT_COMMENT_LIST_SIZE * (page - 1) : undefined,
    });
  }

  public async create(entity: CommentEntity): Promise<Comment> {
    return await this.prisma.comment.create({ data: { ...entity.toObject() } });
  }

  public findById(id: number): Promise<Comment> | null {
    return this.prisma.comment.findFirst({ where: { id } });
  }

  public update(): Promise<Comment> {
    return Promise.resolve(undefined);
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.comment.delete({ where: { id } });
  }
}

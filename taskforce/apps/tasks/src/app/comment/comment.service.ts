import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from '@taskforce/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';
import { TaskRepository } from '../task/task.repository';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { COMMENT_EXCEPTION_MESSAGE } from './comment.constant';

const { TASK_NOT_FOUND, COMMENT_NOT_FOUND, FOREIGN_COMMENT } =
  COMMENT_EXCEPTION_MESSAGE;

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  public async getComments(taskId: number, page: number): Promise<Comment[]> {
    const existTask = await this.taskRepository.findById(taskId);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return await this.commentRepository.findByTaskId(taskId, page);
  }

  public async createComment(
    dto: CreateCommentDto,
    userId: string
  ): Promise<Comment> {
    const existTask = await this.taskRepository.findById(dto.taskId);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    const newCommentEntity = new CommentEntity({ ...dto, userId });
    return await this.commentRepository.create(newCommentEntity);
  }

  public async deleteComment(commentId: number, userId: string): Promise<void> {
    const existComment = await this.commentRepository.findById(commentId);
    if (!existComment) {
      throw new NotFoundException(COMMENT_NOT_FOUND);
    }
    if (existComment.userId !== userId) {
      throw new ForbiddenException(FOREIGN_COMMENT);
    }
    await this.commentRepository.delete(commentId);
  }
}

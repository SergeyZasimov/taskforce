import { ForbiddenException, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from '@taskforce/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async getComments(taskId: number, page: number): Promise<Comment[]> {
    return await this.commentRepository.findByTaskId(taskId, page);
  }

  public async createComment(
    dto: CreateCommentDto,
    userId: string
  ): Promise<Comment> {
    const newCommentEntity = new CommentEntity({ ...dto, userId });
    return await this.commentRepository.create(newCommentEntity);
  }

  public async deleteComment(commentId: number, userId: string): Promise<void> {
    const comment = await this.commentRepository.findById(commentId);
    if (comment.userId !== userId) {
      throw new ForbiddenException('Нельзя удалять чужой комментарий');
    }
    await this.commentRepository.delete(commentId);
  }
}

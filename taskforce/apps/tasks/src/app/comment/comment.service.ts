import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from '@taskforce/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async getComments(taskId: number): Promise<Comment[]> {
    return await this.commentRepository.findByTaskId(taskId);
  }

  public async createComment(dto: CreateCommentDto): Promise<Comment> {
    const newCommentEntity = new CommentEntity(dto);
    return await this.commentRepository.create(newCommentEntity);
  }
}

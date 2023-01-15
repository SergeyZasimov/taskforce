import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { COMMENT_QUERY_VALIDATION_ERROR } from '../comment.constant';

export class CommentQuery {
  @IsInt({ message: COMMENT_QUERY_VALIDATION_ERROR.TASK_IS_REQUIRED })
  @Transform(({ value }) => +value)
  public taskId: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { COMMENT_QUERY_VALIDATION_ERROR } from '../comment.constant';

export class CommentQuery {
  @ApiProperty({
    name: 'taskId',
    description: 'ID задачи для, которой запрашиваются комментарии ',
    type: 'number',
    example: '23',
  })
  @IsInt({ message: COMMENT_QUERY_VALIDATION_ERROR.TASK_IS_REQUIRED })
  @Transform(({ value }) => +value)
  public taskId: number;

  @ApiProperty({
    name: 'page',
    description: 'Номер страницы пагинации',
    type: 'number',
    example: '2',
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}

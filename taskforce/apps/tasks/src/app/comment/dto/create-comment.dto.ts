import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';
import { CREATE_COMMENT_VALIDATION_ERROR } from '../comment.constant';

const { TASK_ID_NOT_VALID, TEXT_LENGTH_NOT_VALID, TEXT_REQUIRED } =
  CREATE_COMMENT_VALIDATION_ERROR;

export class CreateCommentDto {
  @ApiProperty({
    description: 'Текст комментария',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    minLength: 10,
    maxLength: 300,
    required: true,
  })
  @IsString({ message: TEXT_REQUIRED })
  @Length(10, 300, { message: TEXT_LENGTH_NOT_VALID })
  public text: string;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;
}

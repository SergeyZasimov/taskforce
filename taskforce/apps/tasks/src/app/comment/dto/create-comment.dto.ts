import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsString, Length } from 'class-validator';
import { CREATE_COMMENT_VALIDATION_ERROR } from '../comment.constant';

const {
  TASK_ID_NOT_VALID,
  TEXT_LENGTH_NOT_VALID,
  TEXT_REQUIRED,
  USER_ID_NO_VALID,
} = CREATE_COMMENT_VALIDATION_ERROR;

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
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
    description: 'ID of the task to which the comment',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;

  @ApiProperty({
    description: 'ID of the comment author',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  @IsMongoId({ message: USER_ID_NO_VALID })
  public userId: string;
}

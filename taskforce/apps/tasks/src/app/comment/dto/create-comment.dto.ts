import { IsInt, IsMongoId, IsString, Length } from 'class-validator';
import { CREATE_COMMENT_VALIDATION_ERROR } from '../comment.constant';

const {
  TASK_ID_NOT_VALID,
  TEXT_LENGTH_NOT_VALID,
  TEXT_REQUIRED,
  USER_ID_NO_VALID,
} = CREATE_COMMENT_VALIDATION_ERROR;

export class CreateCommentDto {
  @IsString({ message: TEXT_REQUIRED })
  @Length(10, 300, { message: TEXT_LENGTH_NOT_VALID })
  public text: string;

  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;

  @IsMongoId({ message: USER_ID_NO_VALID })
  public userId: string;
}

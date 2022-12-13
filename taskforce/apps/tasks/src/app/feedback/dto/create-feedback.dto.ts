import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';
import { CREATE_FEEDBACK_VALIDATION_ERROR } from '../feedback.constant';

const {
  PRICE_NEGATIVE,
  PRICE_NOT_VALID,
  TASK_ID_NOT_VALID,
  TEXT_LENGTH_NOT_VALID,
  USER_ID_NOT_VALID,
} = CREATE_FEEDBACK_VALIDATION_ERROR;

export class CreateFeedbackDto {
  @MaxLength(150, { message: TEXT_LENGTH_NOT_VALID })
  @IsOptional()
  public text?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: PRICE_NOT_VALID })
  @Min(0, { message: PRICE_NEGATIVE })
  @IsOptional()
  public price?: number;

  @IsMongoId({ message: USER_ID_NOT_VALID })
  public userId: string;

  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;
}

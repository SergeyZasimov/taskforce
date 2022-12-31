import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { REVIEW_VALIDATION_ERRORS } from '../review.constant';

const {
  AUTHOR_ID_NOT_VALID,
  RATING_NOT_VALID,
  RATING_REQUIRED,
  TASK_ID_NOT_VALID,
  TEXT_LENGTH_NOT_VALID,
  TEXT_REQUIRED,
  CONTRACTOR_ID_NOT_VALID,
} = REVIEW_VALIDATION_ERRORS;

export class CreateReviewDto {
  @IsMongoId({ message: AUTHOR_ID_NOT_VALID })
  public authorId: string;

  @IsMongoId({ message: CONTRACTOR_ID_NOT_VALID })
  public contractorId: string;

  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;

  @Length(50, 500, { message: TEXT_LENGTH_NOT_VALID })
  @IsString({ message: TEXT_REQUIRED })
  public text: string;

  @Max(5, { message: RATING_NOT_VALID })
  @Min(1, { message: RATING_NOT_VALID })
  @IsInt({ message: RATING_REQUIRED })
  public rating: number;
}

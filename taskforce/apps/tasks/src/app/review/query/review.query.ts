import { IsMongoId } from 'class-validator';
import { REVIEW_VALIDATION_ERRORS } from '../review.constant';

export class ReviewQuery {
  @IsMongoId({ message: REVIEW_VALIDATION_ERRORS.CONTRACTOR_ID_NOT_VALID })
  public contractorId: string;
}

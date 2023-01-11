import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { REVIEW_VALIDATION_ERRORS } from '../review.constant';

export class ReviewQuery {
  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  @IsMongoId({ message: REVIEW_VALIDATION_ERRORS.CONTRACTOR_ID_NOT_VALID })
  public contractorId: string;
}

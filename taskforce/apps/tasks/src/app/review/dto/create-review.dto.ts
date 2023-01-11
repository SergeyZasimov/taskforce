import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { REVIEW_VALIDATION_ERRORS } from '../review.constant';

const {
  RATING_NOT_VALID,
  RATING_REQUIRED,
  TASK_ID_NOT_VALID,
  TEXT_LENGTH_NOT_VALID,
  TEXT_REQUIRED,
  CONTRACTOR_ID_NOT_VALID,
} = REVIEW_VALIDATION_ERRORS;

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  @IsMongoId({ message: CONTRACTOR_ID_NOT_VALID })
  public contractorId: string;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;

  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    minLength: 50,
    maxLength: 500,
    required: true,
  })
  @Length(50, 500, { message: TEXT_LENGTH_NOT_VALID })
  @IsString({ message: TEXT_REQUIRED })
  public text: string;

  @ApiProperty({
    description: 'Оценка исполнителя',
    example: '5',
    minimum: 1,
    maximum: 5,
    required: true,
  })
  @Max(5, { message: RATING_NOT_VALID })
  @Min(1, { message: RATING_NOT_VALID })
  @IsInt({ message: RATING_REQUIRED })
  public rating: number;
}

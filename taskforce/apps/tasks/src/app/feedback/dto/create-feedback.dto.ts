import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CREATE_FEEDBACK_VALIDATION_ERROR } from '../feedback.constant';

const {
  PRICE_NEGATIVE,
  PRICE_NOT_VALID,
  TASK_ID_NOT_VALID,
  USER_ID_NOT_VALID,
} = CREATE_FEEDBACK_VALIDATION_ERROR;

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Feedback text',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    required: false,
  })
  @IsString()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: 'Execution price',
    example: '360.99',
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: PRICE_NOT_VALID })
  @Min(0, { message: PRICE_NEGATIVE })
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'ID of the feedback author',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  @IsMongoId({ message: USER_ID_NOT_VALID })
  @IsOptional()
  public contractorId?: string;

  @ApiProperty({
    description: 'ID of the task to which the feedback',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;
}

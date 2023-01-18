import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { CREATE_FEEDBACK_VALIDATION_ERROR } from '../feedback.constant';

const {
  PRICE_NEGATIVE,
  PRICE_NOT_VALID,
  TASK_ID_NOT_VALID,
} = CREATE_FEEDBACK_VALIDATION_ERROR;

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    required: false,
  })
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: 'Предложенная стоимость выполнения',
    example: '360.99',
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: PRICE_NOT_VALID })
  @Min(0, { message: PRICE_NEGATIVE })
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;
}

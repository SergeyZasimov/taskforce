import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { FEEDBACK_QUERY_VALIDATION_ERROR } from '../feedback.constant';

export class FeedbackQuery {
  @ApiProperty({
    name: 'taskId',
    description: 'ID задачи',
    type: 'number',
    example: '23',
  })
  @Transform(({ value }) => +value)
  @IsInt({ message: FEEDBACK_QUERY_VALIDATION_ERROR.TASK_ID_REQUIRED })
  taskId: number;
}

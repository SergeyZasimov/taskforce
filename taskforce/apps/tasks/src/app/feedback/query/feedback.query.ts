import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FeedbackQuery {
  @ApiProperty({
    name: 'taskId',
    description: 'ID of the task to which the feedbacks',
    type: 'number',
    example: '23',
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  taskId: number;
}

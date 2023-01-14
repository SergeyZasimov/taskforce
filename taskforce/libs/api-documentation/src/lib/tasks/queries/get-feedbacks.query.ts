import { ApiProperty } from '@nestjs/swagger';

export class ApiFeedbackQuery {
  @ApiProperty({
    name: 'taskId',
    description: 'ID задачи',
    type: 'number',
    example: '23',
  })
  public taskId: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackSchema {
  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    required: false,
  })
  public text?: string;

  @ApiProperty({
    description: 'Предложенная стоимость выполнения',
    example: '360.99',
    required: false,
  })
  public price?: number;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  public taskId: number;
}

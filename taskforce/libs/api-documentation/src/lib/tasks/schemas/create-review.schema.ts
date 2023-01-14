import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewSchema {
  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  public contractorId: string;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  public taskId: number;

  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    minLength: 50,
    maxLength: 500,
    required: true,
  })
  public text: string;

  @ApiProperty({
    description: 'Оценка исполнителя',
    example: '5',
    minimum: 1,
    maximum: 5,
    required: true,
  })
  public rating: number;
}

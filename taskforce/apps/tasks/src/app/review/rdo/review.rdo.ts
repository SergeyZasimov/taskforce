import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'ID отзыва',
    example: '5',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public customerId: number;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Оценка исполнителя',
    example: '5',
  })
  @Expose()
  public rating: number;
}

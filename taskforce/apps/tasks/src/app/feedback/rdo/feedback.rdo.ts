import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FeedbackRdo {
  @ApiProperty({
    description: 'ID отклика',
    example: '23',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Предложенная стоимость выполнения',
    example: '360.99',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'Дата создания отклика',
    example: '2022-12-09T03:25:45.222Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'ID задачи',
    example: '23',
  })
  @Expose()
  public taskId: number;
}

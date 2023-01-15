import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @ApiProperty({
    description: 'ID задачи',
    example: '3',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Lorem ipsum dolor si amet.',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Детальное описание задачи',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Категория',
    example: 'Works',
  })
  @Expose()
  public category: string;

  @ApiProperty({
    description: 'ID заказчика',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public customerId: string;

  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'Стоимость выполнения',
    example: '350.50',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Срок исполнения',
    example: '2022-12-22',
  })
  @Expose()
  public executionTerm: Date;

  @ApiProperty({
    description: 'Изображение',
    example: 'http://localhost:3333/upload/image.jpg',
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Адрес задачи',
    example: 'Москва Ленинградское ш., 23',
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Теги',
    example: ['new', 'tag'],
    type: 'array',
    items: {
      type: 'string',
      description: 'Task tag starting with a letter',
      example: 'tag',
    },
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Статус задачи',
    example: 'new',
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2022-12-09T03:25:45.222Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Количество комментариев',
    example: '8',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Количество откликов',
    example: '8',
  })
  @Expose()
  public feedbacksCount: number;
}

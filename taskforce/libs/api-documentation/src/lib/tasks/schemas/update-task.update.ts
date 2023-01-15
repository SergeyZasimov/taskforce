import { ApiProperty } from '@nestjs/swagger';
import { Category, Tag } from '@taskforce/shared-types';

export class UpdateTaskSchema {
  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Lorem ipsum dolor si amet.',
    minLength: 20,
    maxLength: 50,
    required: true,
  })
  public title: string;

  @ApiProperty({
    description: 'Детальное описание задачи',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    minLength: 100,
    maxLength: 1024,
    required: true,
  })
  public description: string;

  @ApiProperty({
    description: 'Категория',
    example: 'Works',
    type: 'string',
    required: true,
  })
  public category: Category;

  @ApiProperty({
    description: 'Стоимость выполнения',
    example: '350.50',
    required: false,
  })
  public price?: number;

  @ApiProperty({
    description: 'Срок исполнения',
    example: '2022-12-22',
    required: false,
  })
  public executionTerm?: Date;

  @ApiProperty({
    description: 'Адрес задачи',
    example: 'Москва Ленинградское ш., 23',
    minLength: 10,
    maxLength: 255,
    required: false,
  })
  public address?: string;

  @ApiProperty({
    description: 'Теги',
    example: ['new', 'tag'],
    maxItems: 5,
    type: 'array',
    items: {
      type: 'string',
      description: 'Task tag starting with a letter',
      minLength: 3,
      maxLength: 10,
      example: 'tag',
    },
    required: false,
  })
  public tags?: Tag[];
}

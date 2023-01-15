import { ApiProperty } from '@nestjs/swagger';
import { AvailableCities, Cities } from '@taskforce/shared-types';

export class ApiTaskQuery {
  @ApiProperty({
    name: 'category',
    description: 'Фильтрация по категории',
    type: 'string',
    required: false,
  })
  public category?: string;

  @ApiProperty({
    name: 'tags',
    description: 'Фильтрация по тегу',
    type: 'array',
    required: false,
    items: {
      type: 'string',
    },
  })
  public tags?: string[];

  @ApiProperty({
    name: 'city',
    description: 'Фильтрация по городу',
    type: 'string',
    required: false,
    enum: Cities,
  })
  public city?: AvailableCities;

  @ApiProperty({
    name: 'limit',
    description: 'Количество отображаемых задач',
    default: '25',
    type: 'number',
    required: false,
  })
  public limit: number;

  @ApiProperty({
    name: 'page',
    description: 'Страница пагинации',
    type: 'number',
    required: false,
  })
  public page?: number;

  @ApiProperty({
    name: 'sortingDirection',
    description: 'Направление сортировки',
    enum: ['asc', 'desc'],
    default: 'desc',
    type: 'string',
    required: false,
  })
  public sortingDirection?: 'asc' | 'desc';

  @ApiProperty({
    name: 'sortingOption',
    description: 'Вариант сортировки',
    enum: ['createdAt', 'comments', 'feedbacks'],
    default: 'createdAt',
    type: 'string',
    required: false,
  })
  public sortingOption?: 'createdAt' | 'comments' | 'feedbacks';
}

import { ApiProperty } from '@nestjs/swagger';
import { AvailableCities, Cities } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

const DEFAULT_TASK_COUNT_LIMIT = 3;
const DEFAULT_SORTING_DIRECTION = 'desc';
const DEFAULT_SORTING_OPTION = 'createdAt';

export class TaskQuery {
  @ApiProperty({
    name: 'category',
    description: 'Фильтрация по категории',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
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
  @IsArray({})
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    name: 'city',
    description: 'Фильтрация по городу',
    type: 'string',
    required: false,
    enum: Cities,
  })
  @IsEnum(Cities, { message: TASK_VALIDATION_ERROR.CITY_NOT_VALID })
  @IsOptional()
  public city?: AvailableCities;

  @ApiProperty({
    name: 'limit',
    description: 'Количество отображаемых задач',
    default: '25',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @ApiProperty({
    name: 'page',
    description: 'Страница пагинации',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @ApiProperty({
    name: 'sortingDirection',
    description: 'Направление сортировки',
    enum: ['asc', 'desc'],
    default: 'desc',
    type: 'string',
    required: false,
  })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortingDirection?: 'asc' | 'desc' = DEFAULT_SORTING_DIRECTION;

  @ApiProperty({
    name: 'sortingOption',
    description: 'Вариант сортировки',
    enum: ['createdAt', 'comments', 'feedbacks'],
    default: 'createdAt',
    type: 'string',
    required: false,
  })
  @IsIn(['createdAt', 'comments', 'feedbacks'])
  @IsOptional()
  public sortingOption?: 'createdAt' | 'comments' | 'feedbacks' =
    DEFAULT_SORTING_OPTION;
}

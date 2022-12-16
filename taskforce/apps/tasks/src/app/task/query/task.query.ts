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

const DEFAULT_TASK_COUNT_LIMIT = 3;
const DEFAULT_SORTING_DIRECTION = 'desc';
const DEFAULT_SORTING_OPTION = 'createdAt';

export class TaskQuery {
  @ApiProperty({
    name: 'category',
    description: 'Filtering by category',
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  public category?: string;

  @ApiProperty({
    name: 'tags',
    description: 'Filtering by tags',
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
    description: 'Filtering by city',
    type: 'string',
    required: false,
  })
  @IsEnum(Cities)
  @IsOptional()
  public city?: AvailableCities;

  @ApiProperty({
    name: 'limit',
    description: 'The number of tasks that are shown',
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
    description: 'Pagination page',
    type: 'number',
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @ApiProperty({
    name: 'sortingDirection',
    description: 'Sorting direction',
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
    description: 'Sorting option',
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

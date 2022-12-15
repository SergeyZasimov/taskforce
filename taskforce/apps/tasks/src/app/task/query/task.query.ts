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
  @Transform(({ value }) => +value || DEFAULT_TASK_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_TASK_COUNT_LIMIT;

  @IsString()
  @IsOptional()
  public category?: string;

  @IsArray({})
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public tags?: string[];

  @IsEnum(Cities)
  @IsOptional()
  public city?: AvailableCities;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortingDirection?: 'asc' | 'desc' = DEFAULT_SORTING_DIRECTION;

  @IsIn(['createdAt', 'comments', 'feedbacks'])
  @IsOptional()
  public sortingOption?: 'createdAt' | 'comments' | 'feedbacks' =
    DEFAULT_SORTING_OPTION;
}

import { ApiProperty } from '@nestjs/swagger';
import { Category, Tag, TaskStatus } from '@taskforce/shared-types';
import {
  Length,
  IsMongoId,
  IsNumber,
  Min,
  IsOptional,
  IsDateString,
  Matches,
  ArrayMaxSize,
  IsEnum,
  Validate,
  IsEmpty,
} from 'class-validator';
import { CREATE_TASK_VALIDATION_ERROR } from '../task.constant';
import { ExecutionTermValidator } from '../validators/execution-term.validator';

const {
  ADDRESS_LENGTH_NOT_VALID,
  DESCRIPTION_LENGTH_NOT_VALID,
  EXECUTION_TERM_MIN_DATE_NOT_VALID,
  EXECUTION_TERM_NOT_VALID,
  PRICE_NEGATIVE,
  PRICE_NOT_VALID,
  TAGS_SIZE_NOT_VALID,
  TAG_LENGTH_NOT_VALID,
  TAG_STARTS_WITH_NOT_VALID,
  TITLE_LENGTH_NOT_VALID,
  USER_ID_NOT_VALID,
  STATUS_NOT_UPDATE,
} = CREATE_TASK_VALIDATION_ERROR;

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Lorem ipsum dolor si amet.',
    minLength: 20,
    maxLength: 50,
    required: true,
  })
  @Length(20, 50, { message: TITLE_LENGTH_NOT_VALID })
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    minLength: 100,
    maxLength: 1024,
    required: true,
  })
  @Length(100, 1024, { message: DESCRIPTION_LENGTH_NOT_VALID })
  @IsOptional()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Works',
    type: 'string',
    required: true,
  })
  @IsOptional()
  public category: Category;

  @ApiProperty({
    description: 'User ID of the task creator',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  @IsMongoId({ message: USER_ID_NOT_VALID })
  @IsOptional()
  public customerId?: string;

  @ApiProperty({
    description: 'Task completion price',
    example: '350.50',
    required: false,
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: PRICE_NOT_VALID })
  @Min(0, { message: PRICE_NEGATIVE })
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'The deadline for completion the task',
    example: '2022-12-22',
    required: false,
  })
  @Validate(ExecutionTermValidator, {
    message: EXECUTION_TERM_MIN_DATE_NOT_VALID,
  })
  @IsDateString({}, { message: EXECUTION_TERM_NOT_VALID })
  @IsOptional()
  public executionTerm?: Date;

  @ApiProperty({
    description: 'Task address',
    example: 'Москва Ленинградское ш., 23',
    minLength: 10,
    maxLength: 255,
    required: false,
  })
  @Length(10, 255, { message: ADDRESS_LENGTH_NOT_VALID })
  @IsOptional()
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
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
  @Matches(/^[ЁёА-яa-zA-Z]{1}.*$/, {
    each: true,
    message: TAG_STARTS_WITH_NOT_VALID,
  })
  @Length(3, 10, {
    each: true,
    message: TAG_LENGTH_NOT_VALID,
  })
  @ArrayMaxSize(5, { message: TAGS_SIZE_NOT_VALID })
  @IsOptional()
  public tags?: Tag[];

  @IsEmpty({ message: STATUS_NOT_UPDATE })
  @IsOptional()
  public status: TaskStatus;
}

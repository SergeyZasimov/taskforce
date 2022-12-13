import { Category, Tag } from '@taskforce/shared-types';
import {
  ArrayMaxSize,
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  Validate,
} from 'class-validator';
import { CREATE_TASK_VALIDATION_ERROR } from '../task.constant';
import { ExecutionTermValidator } from '../validators/execution-term.validator';

const {
  ADDRESS_LENGTH_NOT_VALID,
  CATEGORY_REQUIRED,
  DESCRIPTION_LENGTH_NOT_VALID,
  DESCRIPTION_REQUIRED,
  EXECUTION_TERM_MIN_DATE_NOT_VALID,
  EXECUTION_TERM_NOT_VALID,
  PRICE_NEGATIVE,
  PRICE_NOT_VALID,
  TAGS_SIZE_NOT_VALID,
  TAG_LENGTH_NOT_VALID,
  TAG_STARTS_WITH_NOT_VALID,
  TITLE_LENGTH_NOT_VALID,
  TITLE_REQUIRED,
  USER_ID_NOT_VALID,
} = CREATE_TASK_VALIDATION_ERROR;

export class CreateTaskDto {
  @Length(20, 50, { message: TITLE_LENGTH_NOT_VALID })
  @IsString({ message: TITLE_REQUIRED })
  public title: string;

  @Length(100, 1024, { message: DESCRIPTION_LENGTH_NOT_VALID })
  @IsString({ message: DESCRIPTION_REQUIRED })
  public description: string;

  @IsString({ message: CATEGORY_REQUIRED })
  public category: Category;

  @IsMongoId({ message: USER_ID_NOT_VALID })
  public userId: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: PRICE_NOT_VALID })
  @Min(0, { message: PRICE_NEGATIVE })
  @IsOptional()
  public price?: number;

  @Validate(ExecutionTermValidator, {
    message: EXECUTION_TERM_MIN_DATE_NOT_VALID,
  })
  @IsDateString({}, { message: EXECUTION_TERM_NOT_VALID })
  @IsOptional()
  public executionTerm?: Date;

  @Length(10, 255, { message: ADDRESS_LENGTH_NOT_VALID })
  @IsOptional()
  public address?: string;

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
}

import { AvailableCities, Cities, UserRole } from '@taskforce/shared-types';
import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

const {
  NAME_REQUIRED,
  NAME_LENGTH_NOT_VALID,
  CITY_NOT_VALID,
  BIRTHDAY_NOT_VALID,
  RESUME_LENGTH_NOT_VALID,
  SPECIALTY_LENGTH_NOT_VALID,
  EMAIL_NOT_UPDATE,
  ROLE_NOT_UPDATE,
} = USER_VALIDATION_ERRORS;

export class UpdateUserDto {
  @IsString({ message: NAME_REQUIRED })
  @Length(3, 50, { message: NAME_LENGTH_NOT_VALID })
  @IsOptional()
  public name?: string;

  @IsEnum(Cities, { message: CITY_NOT_VALID })
  @IsOptional()
  public city?: AvailableCities;

  @IsDateString({}, { message: BIRTHDAY_NOT_VALID })
  @IsOptional()
  public birthday?: Date;

  @MaxLength(300, { message: RESUME_LENGTH_NOT_VALID })
  @IsString()
  @IsOptional()
  public resume?: string;

  @ArrayMaxSize(5, { message: SPECIALTY_LENGTH_NOT_VALID })
  @IsArray()
  @IsOptional()
  public specialty?: string[];

  @IsEmpty({ message: EMAIL_NOT_UPDATE })
  @IsOptional()
  public email: string;

  @IsEmpty({ message: ROLE_NOT_UPDATE })
  @IsOptional()
  public role: UserRole;
}

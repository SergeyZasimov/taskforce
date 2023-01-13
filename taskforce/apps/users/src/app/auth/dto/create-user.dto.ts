import { AvailableCities, UserRole, Cities } from '@taskforce/shared-types';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';
import { TeenageValidator } from '../../validators/teenage.validator';

const {
  NAME_LENGTH_NOT_VALID,
  NAME_REQUIRED,
  EMAIL_REQUIRED,
  PASSWORD_LENGTH_NOT_VALID,
  PASSWORD_REQUIRED,
  CITY_NOT_VALID,
  BIRTHDAY_NOT_VALID,
  ROLE_REQUIRED,
  TEENAGE_CONSTRAINT,
} = USER_VALIDATION_ERRORS;

export class CreateUserDto {
  @IsString({ message: NAME_REQUIRED })
  @Length(3, 50, { message: NAME_LENGTH_NOT_VALID })
  public name: string;

  @IsEmail({}, { message: EMAIL_REQUIRED })
  public email: string;

  @IsString({ message: PASSWORD_REQUIRED })
  @Length(6, 12, {
    message: PASSWORD_LENGTH_NOT_VALID,
  })
  public password: string;

  @IsEnum(Cities, { message: CITY_NOT_VALID })
  public city: AvailableCities;

  @Validate(TeenageValidator, { message: TEENAGE_CONSTRAINT })
  @IsDateString({}, { message: BIRTHDAY_NOT_VALID })
  public birthday: string;

  @IsEnum(UserRole, { message: ROLE_REQUIRED })
  public role: UserRole;
}

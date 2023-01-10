import { ApiProperty } from '@nestjs/swagger';
import { AvailableCities, UserRole } from '@taskforce/shared-types';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Cities } from 'libs/shared-types/src/lib/const';
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
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  @IsString({ message: NAME_REQUIRED })
  @Length(3, 50, { message: NAME_LENGTH_NOT_VALID })
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@mail.com',
    required: true,
  })
  @IsEmail({}, { message: EMAIL_REQUIRED })
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'secret',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  @IsString({ message: PASSWORD_REQUIRED })
  @Length(6, 12, {
    message: PASSWORD_LENGTH_NOT_VALID,
  })
  public password: string;

  @ApiProperty({
    description: 'Один из доступных городов',
    example: 'Москва',
    enum: Cities,
    required: true,
  })
  @IsEnum(Cities, { message: CITY_NOT_VALID })
  public city: AvailableCities;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1970-11-20',
    required: true,
  })
  @Validate(TeenageValidator, { message: TEENAGE_CONSTRAINT })
  @IsDateString({}, { message: BIRTHDAY_NOT_VALID })
  public birthday: string;

  @ApiProperty({
    description: 'Одна из ролей',
    example: 'заказчик',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole, { message: ROLE_REQUIRED })
  public role: UserRole;
}

import { ApiProperty } from '@nestjs/swagger';
import { AvailableCities, UserRole } from '@taskforce/shared-types';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Cities } from 'libs/shared-types/src/lib/const';
import { AUTH_USER_VALIDATION_ERRORS } from '../auth.constant';

const {
  NAME_LENGTH_NOT_VALID,
  NAME_REQUIRED,
  EMAIL_REQUIRED,
  PASSWORD_LENGTH_NOT_VALID,
  PASSWORD_REQUIRED,
  CITY_NOT_VALID,
  BIRTHDAY_NOT_VALID,
  ROLE_REQUIRED,
} = AUTH_USER_VALIDATION_ERRORS;

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Smith',
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  @IsString({ message: NAME_REQUIRED })
  @Length(3, 50, { message: NAME_LENGTH_NOT_VALID })
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
    required: true,
  })
  @IsEmail({}, { message: EMAIL_REQUIRED })
  public email: string;

  @ApiProperty({
    description: 'User password',
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
    description: 'One of the available cities',
    example: 'Москва',
    enum: Cities,
    required: true,
  })
  @IsEnum(Cities, { message: CITY_NOT_VALID })
  public city: AvailableCities;

  @ApiProperty({
    description: 'User birthday',
    example: '2022-11-20',
    required: true,
  })
  @IsDateString({}, { message: BIRTHDAY_NOT_VALID })
  public birthday: string;

  @ApiProperty({
    description: 'One of the role',
    example: 'Customer',
    enum: UserRole,
    required: true,
  })
  @IsEnum(UserRole, { message: ROLE_REQUIRED })
  public role: UserRole;
}

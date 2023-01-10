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
  Validate,
} from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';
import { TeenageValidator } from '../../validators/teenage.validator';
import { ApiProperty } from '@nestjs/swagger';

const {
  NAME_REQUIRED,
  NAME_LENGTH_NOT_VALID,
  CITY_NOT_VALID,
  BIRTHDAY_NOT_VALID,
  RESUME_LENGTH_NOT_VALID,
  SPECIALTY_LENGTH_NOT_VALID,
  EMAIL_NOT_UPDATE,
  ROLE_NOT_UPDATE,
  TEENAGE_CONSTRAINT,
} = USER_VALIDATION_ERRORS;

export class UpdateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
    minLength: 3,
    maxLength: 50,
    required: false,
  })
  @IsString({ message: NAME_REQUIRED })
  @Length(3, 50, { message: NAME_LENGTH_NOT_VALID })
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Один из доступных городов',
    example: 'Москва',
    enum: Cities,
    required: false,
  })
  @IsEnum(Cities, { message: CITY_NOT_VALID })
  @IsOptional()
  public city?: AvailableCities;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1970-11-20',
    required: false,
  })
  @Validate(TeenageValidator, { message: TEENAGE_CONSTRAINT })
  @IsDateString({}, { message: BIRTHDAY_NOT_VALID })
  @IsOptional()
  public birthday?: Date;

  @ApiProperty({
    description: 'Информация о пользователе',
    example:
      'Соответствующих напрямую рамки модернизации обучения позиции обществом предпосылки принципов сомнений. Роль мира экономической кадров отношении рамки работы отношении формировании проблем. Прежде формирования общественной.',
    maxLength: 300,
    required: false,
  })
  @MaxLength(300, { message: RESUME_LENGTH_NOT_VALID })
  @IsString()
  @IsOptional()
  public resume?: string;

  @ApiProperty({
    description: 'Специализация пользователя',
    example: '["строительство", "ремонт"]',
    type: 'string[]',
    maxItems: 5,
    required: false,
  })
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

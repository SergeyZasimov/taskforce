import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

const { EMAIL_REQUIRED, PASSWORD_REQUIRED, PASSWORD_LENGTH_NOT_VALID } =
  USER_VALIDATION_ERRORS;

export class LoginUserDto {
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
}

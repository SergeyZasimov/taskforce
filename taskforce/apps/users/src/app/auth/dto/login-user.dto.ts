import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AUTH_USER_VALIDATION_ERRORS } from '../auth.constant';

const { EMAIL_REQUIRED, PASSWORD_REQUIRED, PASSWORD_LENGTH_NOT_VALID } =
  AUTH_USER_VALIDATION_ERRORS;

export class LoginUserDto {
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
}

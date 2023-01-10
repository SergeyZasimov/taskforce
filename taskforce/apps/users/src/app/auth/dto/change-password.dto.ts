import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

const { PASSWORD_REQUIRED, PASSWORD_LENGTH_NOT_VALID } = USER_VALIDATION_ERRORS;

export class ChangePasswordDto {
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
  public currentPassword: string;

  @ApiProperty({
    description: 'Новый пароль пользователя',
    example: 'newSecret',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  @IsString({ message: PASSWORD_REQUIRED })
  @Length(6, 12, {
    message: PASSWORD_LENGTH_NOT_VALID,
  })
  public newPassword: string;
}

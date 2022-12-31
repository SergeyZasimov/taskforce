import { IsString, Length } from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

const { PASSWORD_REQUIRED, PASSWORD_LENGTH_NOT_VALID } = USER_VALIDATION_ERRORS;

export class ChangePasswordDto {
  @IsString({ message: PASSWORD_REQUIRED })
  @Length(6, 12, {
    message: PASSWORD_LENGTH_NOT_VALID,
  })
  public currentPassword: string;

  @IsString({ message: PASSWORD_REQUIRED })
  @Length(6, 12, {
    message: PASSWORD_LENGTH_NOT_VALID,
  })
  public newPassword: string;
}

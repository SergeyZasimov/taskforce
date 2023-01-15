import { IsEmail, IsString, Length } from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

const { EMAIL_REQUIRED, PASSWORD_REQUIRED, PASSWORD_LENGTH_NOT_VALID } =
  USER_VALIDATION_ERRORS;

export class LoginUserDto {
  @IsEmail({}, { message: EMAIL_REQUIRED })
  public email: string;

  @IsString({ message: PASSWORD_REQUIRED })
  @Length(6, 12, {
    message: PASSWORD_LENGTH_NOT_VALID,
  })
  public password: string;
}

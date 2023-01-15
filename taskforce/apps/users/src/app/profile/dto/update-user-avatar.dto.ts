import { Matches } from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

export class UpdateUserAvatarDto {
  @Matches(/[\w/-]+.(jpg|png|jpeg)$/, {
    message: USER_VALIDATION_ERRORS.AVATAR_ERROR,
  })
  public avatar: string;
}

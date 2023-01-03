import { Matches } from 'class-validator';

export class UpdateUserAvatarDto {
  @Matches(/[\w/-]+.(jpg|png|jpeg)/, { message: 'Avatar must be jpg, png' })
  public avatar: string;
}

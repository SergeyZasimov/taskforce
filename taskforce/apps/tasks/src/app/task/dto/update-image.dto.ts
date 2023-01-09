import { Matches } from 'class-validator';

export class UpdateImageDto {
  @Matches(/[\w/-]+.(jpg|png|jpeg)/, { message: 'Image must be jpg, png' })
  public image: string;
}

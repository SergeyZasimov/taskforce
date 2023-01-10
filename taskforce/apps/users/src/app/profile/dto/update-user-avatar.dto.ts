import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { USER_VALIDATION_ERRORS } from '../../app.constant';

export class UpdateUserAvatarDto {
  @ApiProperty({
    description: 'Путь до изображения',
    example: './avatar.jpg',
  })
  @Matches(/[\w/-]+.(jpg|png|jpeg)$/, {
    message: USER_VALIDATION_ERRORS.AVATAR_ERROR,
  })
  public avatar: string;
}

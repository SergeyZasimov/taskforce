import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

export class UpdateImageDto {
  @ApiProperty({
    description: 'Изображение',
    example: 'http://localhost:3333/upload/image.jpg',
    format: 'binary',
  })
  @Matches(/[\w/-]+.(jpg|png|jpeg)$/, {
    message: TASK_VALIDATION_ERROR.IMAGE_NOT_VALID,
  })
  public image: string;
}

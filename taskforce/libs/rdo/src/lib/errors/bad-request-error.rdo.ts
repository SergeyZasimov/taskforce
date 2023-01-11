import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BadRequestErrorRdo {
  @ApiProperty({
    description: 'Код статуса',
    example: 400,
  })
  @Expose()
  public statusCode: number;

  @ApiProperty({
    description: 'Список сообщений',
    example: [
      'E-mail - обязательное поле',
      'Возможен только один город из списка: Москва, Санкт-Петербург, Владивосток',
    ],
    type: 'string[]',
  })
  @Expose()
  public message: string[];

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Bad Request',
  })
  @Expose()
  public error: string;
}

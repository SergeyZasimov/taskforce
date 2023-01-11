import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotFoundErrorRdo {
  @ApiProperty({
    description: 'Код статуса',
    example: 404,
  })
  @Expose()
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Пользователь не найден',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Not Found',
  })
  @Expose()
  public error: string;
}

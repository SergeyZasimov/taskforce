import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UnauthorizedErrorRdo {
  @ApiProperty({
    description: 'Код статуса',
    example: 401,
  })
  @Expose()
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Неверный пароль',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Unauthorized',
  })
  @Expose()
  public error: string;
}

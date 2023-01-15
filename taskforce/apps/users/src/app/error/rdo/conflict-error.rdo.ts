import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ConflictErrorRdo {
  @ApiProperty({
    description: 'Код статуса',
    example: 409,
  })
  @Expose()
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Пользователь уже зарегистрирован',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Conflict',
  })
  @Expose()
  public error: string;
}

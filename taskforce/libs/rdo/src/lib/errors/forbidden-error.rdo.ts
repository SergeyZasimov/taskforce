import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ForbiddenErrorRdo {
  @ApiProperty({
    description: 'Код статуса',
    example: 403,
  })
  @Expose()
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Нельзя удалять чужой комментарий',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Forbidden',
  })
  @Expose()
  public error: string;
}

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
    example: 'Unauthorized',
  })
  @Expose()
  public message: string;
}

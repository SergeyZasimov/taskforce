import { ApiProperty } from '@nestjs/swagger';

export class ConflictSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 409,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Пользователь уже зарегистрирован',
  })
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Conflict',
  })
  public error: string;
}

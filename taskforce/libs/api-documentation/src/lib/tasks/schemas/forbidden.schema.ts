import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 403,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Неверная роль пользователя',
    type: 'string[]',
  })
  public message: string[];

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Forbidden',
  })
  public error: string;
}

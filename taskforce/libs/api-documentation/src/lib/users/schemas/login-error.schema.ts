import { ApiProperty } from '@nestjs/swagger';

export class PasswordErrorSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 403,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Неверный пароль',
  })
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Forbidden',
  })
  public error: string;
}

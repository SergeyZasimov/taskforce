import { ApiProperty } from '@nestjs/swagger';

export class UserBadRequestSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 400,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Список сообщений',
    example: [
      'E-mail - обязательное поле',
      'Пароль должен быть не менее 6 символов, и не более 12',
    ],
    type: 'string[]',
  })
  public message: string[];

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Bad Request',
  })
  public error: string;
}

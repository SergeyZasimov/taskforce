import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 400,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Список сообщений',
    example: ['Текст - обязательное поле', 'Неверный ID задания'],
    type: 'string[]',
  })
  public message: string[];

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Bad Request',
  })
  public error: string;
}

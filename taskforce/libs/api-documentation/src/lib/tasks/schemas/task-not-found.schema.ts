import { ApiProperty } from '@nestjs/swagger';

export class TaskNotFoundSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 404,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Задача не найден',
  })
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Not Found',
  })
  public error: string;
}

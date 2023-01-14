import { ApiProperty } from '@nestjs/swagger';

export class CommentNotFoundSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 404,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Комментарий не найден',
  })
  public message: string;

  @ApiProperty({
    description: 'Имя ошибки',
    example: 'Not Found',
  })
  public error: string;
}

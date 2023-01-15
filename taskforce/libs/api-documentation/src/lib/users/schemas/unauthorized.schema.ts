import { ApiProperty } from '@nestjs/swagger';

export class UserUnauthorizedSchema {
  @ApiProperty({
    description: 'Код статуса',
    example: 401,
  })
  public statusCode: number;

  @ApiProperty({
    description: 'Сообщение',
    example: 'Unauthorized',
    type: 'string',
  })
  public message: string;
}

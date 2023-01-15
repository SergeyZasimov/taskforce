import { ApiProperty } from '@nestjs/swagger';

export class LoginUserSchema {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@mail.com',
    required: true,
  })
  public email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'secret',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  public password: string;
}

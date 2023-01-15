import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordSchema {
  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'secret',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  public currentPassword: string;

  @ApiProperty({
    description: 'Новый пароль пользователя',
    example: 'newSecret',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  public newPassword: string;
}

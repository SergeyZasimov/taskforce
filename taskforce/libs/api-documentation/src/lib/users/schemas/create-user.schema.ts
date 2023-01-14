import { ApiProperty } from '@nestjs/swagger';
import { UserRole, Cities } from '@taskforce/shared-types';

export class CreateUserSchema {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  public name: string;

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

  @ApiProperty({
    description: 'Один из доступных городов',
    example: 'Москва',
    enum: Cities,
    required: true,
  })
  public city: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1970-11-20',
    required: true,
  })
  public birthday: string;

  @ApiProperty({
    description: 'Одна из ролей',
    example: UserRole.Contractor,
    enum: UserRole,
    required: true,
  })
  public role: string;
}

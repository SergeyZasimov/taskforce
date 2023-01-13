import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseSchema {
  @ApiProperty({
    description: 'ID пользователя',
    example: '6382db68d4aa0280d04bb17f',
  })
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
  })
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@mail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'Аватар',
    example: 'http://localhost:3333/upload/user1-avatar.png',
  })
  public avatar: string;

  @ApiProperty({
    description: 'Город пользователя',
    example: 'Москва',
  })
  public city: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'заказчик',
  })
  public role: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '2022-11-20',
  })
  public birthday: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'ID пользователя',
    example: '6382db68d4aa0280d04bb17f',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@mail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Аватар',
    example: 'http://localhost:3333/upload/user1-avatar.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Город пользователя',
    example: 'Москва',
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'заказчик',
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '2022-11-20',
  })
  @Expose()
  public birthday: string;
}

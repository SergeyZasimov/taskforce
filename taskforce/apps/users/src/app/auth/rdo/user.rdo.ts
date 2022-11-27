import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id)
  @ApiProperty({
    description: 'User ID',
    example: '6382db68d4aa0280d04bb17f',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User name',
    example: 'John Smith',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'URL to avatar image',
    example: 'http://localhost:3333/upload/user1-avatar.png',
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: 'One of the available cities',
    example: 'Москва',
  })
  public city: string;

  @Expose()
  @ApiProperty({
    description: 'User role',
    example: 'Customer',
  })
  public role: string;

  @Expose()
  @ApiProperty({
    description: 'User birthday',
    example: '2022-11-20',
  })
  public birthday: string;
}

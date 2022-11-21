import { ApiProperty } from '@nestjs/swagger';
import { AvailableCities, UserRole } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';
import { Cities } from 'libs/shared-types/src/lib/const';

export class UserRdo {
  @Expose()
  @ApiProperty({
    description: 'User ID',
    example: 12,
  })
  public id: number;

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

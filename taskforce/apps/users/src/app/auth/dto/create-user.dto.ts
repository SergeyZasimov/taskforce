import { ApiProperty } from '@nestjs/swagger';
import { AvailableCities, UserRole } from '@taskforce/shared-types';
import { Cities } from 'libs/shared-types/src/lib/const';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Smith',
    minLength: 3,
    maxLength: 50,
    required: true,
  })
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
    required: true,
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
    minLength: 6,
    maxLength: 12,
    required: true,
  })
  public password: string;

  @ApiProperty({
    description: 'One of the available cities',
    example: 'Москва',
    enum: Cities,
    required: true,
  })
  public city: AvailableCities;

  @ApiProperty({
    description: 'User birthday',
    example: '2022-11-20',
    required: true,
  })
  public birthday: string;
}

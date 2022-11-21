import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
}

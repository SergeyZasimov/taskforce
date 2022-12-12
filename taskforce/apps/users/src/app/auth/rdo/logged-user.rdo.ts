import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LoggedUserRdo {
  @Expose() public accessToken: string;
}

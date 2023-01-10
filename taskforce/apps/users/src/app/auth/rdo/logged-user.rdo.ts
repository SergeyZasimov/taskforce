import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Токен',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2JkMGVhYjhjZDNiODQzMWUyZThhMTYiLCJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoi0LfQsNC60LDQt9GH0LjQuiIsImlhdCI6MTY3MzM0NDg1MiwiZXhwIjoxNjczMzQ4NDUyfQ.ehWa_6Ki9Xd1gzHSeTK8lGhCOZHUx3PF33TzK246Z2U',
  })
  @Expose()
  public accessToken: string;
}

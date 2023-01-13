import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export class NotifyQuery {
  @ApiProperty({
    name: 'lastNotify',
    description: 'Дата последнего оповещения',
    required: false,
  })
  @Transform(({ value }) => dayjs(value).toDate())
  public lastNotify?: Date;
}

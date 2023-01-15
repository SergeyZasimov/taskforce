import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';

export class ChangeStatusSchema {
  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  public taskId: number;

  @ApiProperty({
    description: 'Статус задачи',
    example: 'new',
    enum: TaskStatus,
  })
  public newStatus: string;
}

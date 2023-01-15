import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';

export class ApiMyTasksQuery {
  @ApiProperty({
    description: 'Статус задачи',
    example: 'New',
    enum: TaskStatus,
    required: false,
  })
  public status?: TaskStatus;
}

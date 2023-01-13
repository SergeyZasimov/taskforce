import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';
import { IsEnum, IsOptional } from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

export class MyTasksQuery {
  @ApiProperty({
    description: 'Статус задачи',
    example: 'New',
    enum: TaskStatus,
    required: false,
  })
  @IsEnum(TaskStatus, { message: TASK_VALIDATION_ERROR.STATUS_NOT_VALID })
  @IsOptional()
  public status?: TaskStatus;
}

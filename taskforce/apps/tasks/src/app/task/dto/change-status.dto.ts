import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@taskforce/shared-types';
import { IsEnum, IsInt } from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

const { TASK_ID_NOT_VALID, STATUS_NOT_VALID } = TASK_VALIDATION_ERROR;

export class ChangeStatusDto {
  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;

  @ApiProperty({
    description: 'Статус задачи',
    example: 'new',
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus, { message: STATUS_NOT_VALID })
  public newStatus: string;
}

import { TaskStatus } from '@taskforce/shared-types';
import { IsEnum, IsInt } from 'class-validator';

export class ChangeStatusDto {
  @IsInt()
  public taskId: number;

  @IsEnum(TaskStatus)
  public newStatus: string;
}

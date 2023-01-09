import { TaskStatus } from '@taskforce/shared-types';
import { IsEnum, IsOptional } from 'class-validator';

export class MyTasksQuery {
  @IsEnum(TaskStatus)
  @IsOptional()
  public status?: TaskStatus;
}

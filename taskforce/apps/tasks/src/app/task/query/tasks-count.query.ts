import { TaskStatus } from '@taskforce/shared-types';
import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

export class TasksCountQuery {
  @IsMongoId({ message: TASK_VALIDATION_ERROR.USER_ID_NOT_VALID })
  public userId: string;

  @IsEnum(TaskStatus, { message: TASK_VALIDATION_ERROR.STATUS_NOT_VALID })
  @IsOptional()
  public status?: TaskStatus;
}

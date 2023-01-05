import {
  ChangeTaskCounter,
  ChangeTasksCounterDirection,
} from '@taskforce/shared-types';
import { IsEnum, IsOptional } from 'class-validator';

export class ChangeTaskCounterQuery {
  @IsEnum(ChangeTaskCounter)
  public counterName: ChangeTaskCounter;

  @IsEnum(ChangeTasksCounterDirection)
  @IsOptional()
  public direction: ChangeTasksCounterDirection;
}

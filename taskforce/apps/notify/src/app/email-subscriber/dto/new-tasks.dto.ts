import { Task } from '@taskforce/shared-types';

export class NewTasksDto {
  public tasks: Task[];
  public email: string;
}

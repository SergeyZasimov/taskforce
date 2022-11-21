import { Task, TaskStatus } from '@taskforce/shared-types';
import { TASK_DEFAULT } from './task.const';

export class TaskEntity implements Task {
  public _id: string;
  public title: string;
  public description: string;
  public category: string;
  public price: number;
  public address: string;
  public executionTerm: Date;
  public image: string;
  public tags: string[];
  public status: TaskStatus;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject(): Task {
    return { ...this };
  }

  private fillEntity(task: Task): void {
    this._id = task._id;
    this.title = task.title;
    this.description = task.description;
    this.category = task.category;
    this.price = task.price || TASK_DEFAULT.PRICE;
    this.address = task.address || TASK_DEFAULT.ADDRESS;
    this.executionTerm = task.executionTerm || TASK_DEFAULT.EXECUTION_TERM;
    this.image = task.image || TASK_DEFAULT.IMAGE;
    this.tags = task.tags || TASK_DEFAULT.TAGS;
    this.status = task.status || TASK_DEFAULT.STATUS;
  }
}

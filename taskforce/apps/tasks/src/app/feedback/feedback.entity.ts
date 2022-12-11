import { Entity } from '@taskforce/core';
import { Feedback } from '@taskforce/shared-types';

export class FeedbackEntity implements Entity<FeedbackEntity>, Feedback {
  public text?: string;
  public price?: number;
  public userId: string;
  public taskId: number;

  constructor(feedback: Feedback) {
    this.fillEntity(feedback);
  }

  toObject(): FeedbackEntity {
    return { ...this };
  }

  public fillEntity(item: Feedback): void {
    this.text = item.text;
    this.price = item.price;
    this.userId = item.userId;
    this.taskId = item.taskId;
  }
}

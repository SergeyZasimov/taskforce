import { Entity } from '@taskforce/core';
import { Review } from '@taskforce/shared-types';

export class ReviewEntity implements Review, Entity<ReviewEntity> {
  public id?: number;
  public customerId: string;
  public contractorId: string;
  public taskId: number;
  public text: string;
  public rating: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  toObject(): ReviewEntity {
    return { ...this };
  }

  fillEntity(item: Review) {
    this.customerId = item.customerId;
    this.contractorId = item.contractorId;
    this.taskId = item.taskId;
    this.text = item.text;
    this.rating = item.rating;
  }
}

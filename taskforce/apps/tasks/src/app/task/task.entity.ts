import { Entity } from '@taskforce/core';
import {
  Category,
  Comment,
  Feedback,
  Tag,
  Task,
  TaskStatus,
} from '@taskforce/shared-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  title: string;
  description: string;
  category: Category;
  userId: string;
  price?: number;
  executionTerm?: Date;
  image?: string;
  address?: string;
  tags?: Tag[];
  status?: TaskStatus;
  comments?: Comment[];
  feedbacks?: Feedback[];

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public toObject(): TaskEntity {
    return {
      ...this,
      price: this.price || 0,
      category: this.category ? { title: this.category } : {},
      tags: this.tags ? this.tags.map((tag) => ({ title: tag })) : [],
    };
  }
  public fillEntity(item: Task) {
    this.title = item.title;
    this.description = item.description;
    this.category = item.category;
    this.userId = item.userId;
    this.price = item.price;
    this.executionTerm = item.executionTerm;
    this.image = item.image;
    this.address = item.address;
    this.tags = item.tags;
    this.status = item.status;
    this.comments = item.comments;
    this.feedbacks = item.feedbacks;
  }
}

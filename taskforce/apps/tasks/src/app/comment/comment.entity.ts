import { Entity } from '@taskforce/core';
import { Comment } from '@taskforce/shared-types';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  id?: number;
  text: string;
  userId: string;
  taskId: number;
  createdAt?: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  toObject(): CommentEntity {
    return { ...this };
  }

  fillEntity(item: Comment): void {
    this.text = item.text;
    this.userId = item.userId;
    this.taskId = item.taskId;
  }
}

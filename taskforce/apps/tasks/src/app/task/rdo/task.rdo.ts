import {
  Category,
  Tag,
  TaskStatus,
} from '@taskforce/shared-types';
import { Expose, Type } from 'class-transformer';
import { CommentRdo } from '../../comment/rdo/comment.rdo';
import { FeedbackRdo } from '../../feedback/rdo/feedback.rdo';

export class TaskRdo {
  @Expose() public id: number;

  @Expose() public title: string;

  @Expose() public description: string;

  @Expose() public category: Category;

  @Expose() public userId: string;

  @Expose() public price: number;

  @Expose() public executionTerm?: Date;

  @Expose() public image: string;

  @Expose() public address: string;

  @Expose() public tags: Tag[];

  @Expose() public status: TaskStatus;

  @Expose() public createdAt: Date;

  @Expose() public updatedAt: Date;

  @Expose()
  @Type(() => CommentRdo)
  public comments: CommentRdo[];

  @Expose()
  @Type(() => FeedbackRdo)
  public feedbacks: FeedbackRdo[];
}

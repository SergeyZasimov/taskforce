import { Category } from './category.type';
import { Tag } from './tag.type';
import { TaskStatus } from './task-status.enum';
import { Comment } from './comment.type';
import { Feedback } from './feedback.type';

export type Task = {
  id?: number;
  title: string;
  description: string;
  category: Category;
  customerId?: string;
  contractorId?: string;
  price?: number;
  executionTerm?: Date;
  image?: string;
  address?: string;
  tags?: Tag[];
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  feedbacks?: Feedback[];
};

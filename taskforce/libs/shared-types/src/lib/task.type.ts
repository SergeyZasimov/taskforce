import { Address } from './address.type';
import { Category } from './category.type';
import { Tag } from './tag.type';
import { TaskStatus } from './task-status.enum';
import { Comment } from './comment.type';
import { Response } from './response.type';

export type Task = {
  id?: string;
  title: string;
  description: string;
  category: Category;
  price?: number;
  executionTerm?: Date;
  image?: string;
  address?: Address;
  tags?: Tag[];
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  responses?: Response[];
};

import { TaskStatus } from './task-status.enum';

export type Task = {
  _id?: string;
  title: string;
  description: string;
  category: string;
  price?: number;
  executionTerm?: Date;
  image?: string;
  address?: string;
  tags?: string[];
  status?: TaskStatus;
};

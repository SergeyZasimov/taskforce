import { Category, Tag } from '@taskforce/shared-types';

export class CreateTaskDto {
  title: string;
  description: string;
  category: Category;
  userId: string;
  price?: number;
  executionTerm?: Date;
  image?: string;
  address?: string;
  tags?: Tag[];
}

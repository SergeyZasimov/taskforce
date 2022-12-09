import { Category, Tag, TaskStatus } from '@taskforce/shared-types';

export class UpdateTaskDto {
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
}

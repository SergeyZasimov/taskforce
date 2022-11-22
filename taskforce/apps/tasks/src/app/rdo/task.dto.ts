import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  category: string;

  @Expose()
  price: number;

  @Expose()
  executionTerm: string;

  @Expose()
  image: string;

  @Expose()
  address: string;

  @Expose()
  tags: string[];

  @Expose()
  status: string;
}

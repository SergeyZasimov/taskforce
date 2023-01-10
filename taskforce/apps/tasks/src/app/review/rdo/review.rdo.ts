import { Expose } from 'class-transformer';

export class ReviewRdo {
  @Expose()
  public id: number;

  @Expose()
  public customerId: number;

  @Expose()
  public taskId: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;
}

import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FeedbackRdo {
  @Expose()
  public id: number;

  @Expose()
  @IsOptional()
  public text: string;

  @Expose()
  @IsOptional()
  public price: number;

  @Expose()
  public userId: string;
}

import { Expose } from 'class-transformer';

export class RatingRdo {
  @Expose()
  public rating: number;

  @Expose()
  public ratingPlace: number;
}

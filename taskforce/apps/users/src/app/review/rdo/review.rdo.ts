import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../auth/rdo/user.rdo';

export class ReviewRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose({ name: 'authorId' })
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public taskId: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;
}

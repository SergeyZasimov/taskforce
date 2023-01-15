import { UserRole } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export class ProfileRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public city: string;

  @Expose()
  public role: string;

  @Expose({ name: 'birthday' })
  @Transform(({ value }) => dayjs().diff(dayjs(value), 'y'))
  public age: number;

  @Expose({ groups: [UserRole.Contractor] })
  public specialty: string[];

  @Expose({ name: 'createdAt' })
  public register: string;

  @Expose()
  public resume: string;
}

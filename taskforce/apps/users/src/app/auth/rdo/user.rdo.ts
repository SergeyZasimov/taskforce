import { AvailableCities, UserRole } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose() public id: number;
  @Expose() public name: string;
  @Expose() public email: string;
  @Expose() public avatar: string;
  @Expose() public city: AvailableCities;
  @Expose() public role: UserRole;
  @Expose() public birthday: Date;
}

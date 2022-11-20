import { AvailableCities } from '@taskforce/shared-types';

export class CreateUserDto {
  public name: string;
  public email: string;
  public password: string;
  public city: AvailableCities;
  public birthday: string;
}

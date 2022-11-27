import { UserRole } from './user-role.enum';
import { AvailableCities } from './available-cities.type';

export type User = {
  _id?: string;
  name: string;
  email: string;
  city: AvailableCities;
  passwordHash?: string;
  role: UserRole;
  avatar?: string;
  birthday: Date;
};

import { UserRole } from './user-role.enum';
import { AvailableCities } from './available-cities.type';

export type User = {
  id?: number;
  email: string;
  city: AvailableCities;
  password: string;
  role: UserRole;
  avatar?: string;
  birthday: Date;
};

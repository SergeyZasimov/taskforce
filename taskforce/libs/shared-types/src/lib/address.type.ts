import { AvailableCities } from './available-cities.type';

export type Address = {
  id?: number;
  city: AvailableCities;
  address: string;
};

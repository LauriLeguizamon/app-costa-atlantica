import { Passenger } from './passenger';

export interface Tour {
  id: number;
  name: string;
  passengers: Passenger[];
}

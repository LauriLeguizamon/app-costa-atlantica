import { Passenger } from './passenger';

export interface Hotel {
  id: number;
  name: string;
  passengers: Passenger[];
}

import { Tour } from './tour';

export interface Hotel {
  id: number;
  name: string;
  tours: Tour[];
}

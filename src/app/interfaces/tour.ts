import { Hotel } from './hotel';

export interface Tour {
  id: number;
  name: string;
  hotels: Hotel[];
}

import { Hotel } from './hotel';
import { Tour } from './tour';

export interface Group {
  name: string;
  hotels: Hotel[];
}

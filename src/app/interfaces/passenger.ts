export interface Passenger {
  id: number;
  name: string;
  description: string;
  adults: number;
  underage: number;
  babies: number;
  free: number;
  upfront?: number;
}

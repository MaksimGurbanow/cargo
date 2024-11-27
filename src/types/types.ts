export interface Cargo {
  id: string;
  name: string;
  origin: string;
  status: StatusText;
  destination: string;
  departureDate: string;
}

export type StatusText = "Waiting" | "On the way" | "Delivered";

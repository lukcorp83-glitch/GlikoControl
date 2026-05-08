export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChartData {
  time: string;
  value: number;
  prediction?: number;
}

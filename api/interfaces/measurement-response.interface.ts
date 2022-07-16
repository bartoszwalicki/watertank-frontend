export interface MeasurementResponse {
  tankId: number;
  field: string;
  time: Date;
  waterLevel: number;
  temperature: number;
}

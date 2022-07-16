import { TimeWindow } from '../enums/time-window.enum';

export interface MeasurementRequest {
  tankId: number;
  timeWindow: TimeWindow;
}

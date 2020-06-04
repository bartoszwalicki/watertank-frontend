import { MeasurmentType } from '../enums/measurment-type.enum';
import { TimeWindow } from '../enums/time-window.enum';

export interface MeasurmentRequest {
  tankId: number;
  measurmentType: MeasurmentType;
  timeWindow: TimeWindow;
}

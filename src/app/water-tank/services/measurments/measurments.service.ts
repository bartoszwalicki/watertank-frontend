import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MeasurmentType } from '../../enums/measurment-type.enum';
import { TimeWindow } from '../../enums/time-window.enum';

@Injectable({
  providedIn: 'root',
})
export class MeasurmentsService {
  constructor(private httpClient: HttpClient) {}

  public getMeasurment(
    tankId: number,
    measurmentType: MeasurmentType,
    timeWindow: TimeWindow = TimeWindow.day
  ): Observable<any> {
    return this.httpClient.get(
      `/api/metrics?tankId=${tankId}&metric=${measurmentType}&timeWindow=${timeWindow}`
    );
  }
}

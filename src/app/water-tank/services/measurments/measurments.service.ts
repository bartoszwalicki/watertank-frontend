import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { MeasurmentType } from '../../enums/measurment-type.enum';
import { TimeWindow } from '../../enums/time-window.enum';
import { MeasurmentReponse } from '../../interfaces/measurment-response.interface';
import { map } from 'rxjs/operators';
import { LastMeasurmentReponse } from 'api/interfaces/last-measurment-response.interface copy';

@Injectable({
  providedIn: 'root',
})
export class MeasurmentsService {
  constructor(private httpClient: HttpClient) {}

  public getLastMeasurment(tankId: number): Observable<LastMeasurmentReponse> {
    return this.httpClient
      .get<any>(`/api/lastMetric?tankId=${tankId}`)
      .pipe(map((lastData) => lastData.data));
  }

  public getMeasurment(
    tankId: number,
    measurmentType: MeasurmentType,
    timeWindow: TimeWindow = TimeWindow.day
  ): Observable<Array<MeasurmentReponse>> {
    return this.httpClient
      .get<any>(
        `/api/metrics?tankId=${tankId}&metric=${measurmentType}&timeWindow=${timeWindow}`
      )
      .pipe(map((arrayData) => arrayData.data));
  }
}

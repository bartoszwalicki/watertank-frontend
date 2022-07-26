import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { TimeWindow } from '../../enums/time-window.enum';
import { LastMeasurementResponse } from '../../interfaces/last-measurement-response.interface';
import { MeasurementResponse } from '../../interfaces/measurement-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MeasurementsService {
  constructor(private httpClient: HttpClient) {}

  public getLastMeasurment(
    tankId: number
  ): Observable<LastMeasurementResponse> {
    return this.httpClient
      .get<any>(`/api/lastMetric?tankId=${tankId}`)
      .pipe(
        map((lastData) => this.convertSingleDataToPercentage(lastData.data))
      );
  }

  public getMeasurment(
    tankId: number,
    timeWindow: TimeWindow = TimeWindow.day
  ): Observable<Array<MeasurementResponse>> {
    return this.httpClient
      .get<any>(`/api/metrics?tankId=${tankId}&timeWindow=${timeWindow}`)
      .pipe(
        map((arrayData) => {
          return arrayData.data.map((singleMeasurment) =>
            this.convertSingleDataToPercentage(singleMeasurment)
          );
        })
      );
  }

  private convertSingleDataToPercentage(
    meas: LastMeasurementResponse | MeasurementResponse
  ): LastMeasurementResponse {
    const minTankLevel = 2340;

    const maxTankLevel = {
      tank0: 541,
      tank1: 541,
    };

    const percentage = Math.ceil(
      ((meas.waterLevel - minTankLevel) /
        ((meas.tankId === 0 ? maxTankLevel.tank0 : maxTankLevel.tank1) -
          minTankLevel)) *
        100
    );
    return Object.assign({}, { ...meas, waterLevel: percentage });
  }
}

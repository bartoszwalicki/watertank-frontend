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
      .pipe(map((lastData) => this.convertSingleDataToPercentage(lastData.data)));
  }

  public getMeasurment(
    tankId: number,
    timeWindow: TimeWindow = TimeWindow.day
  ): Observable<Array<MeasurmentReponse>> {
    return this.httpClient
      .get<any>(`/api/metrics?tankId=${tankId}&timeWindow=${timeWindow}`)
      .pipe(map((arrayData) => {console.log(arrayData.data); return arrayData.data.map(singleMeasurment => this.convertSingleDataToPercentage(singleMeasurment))}));
  }

  private convertSingleDataToPercentage(meas: LastMeasurmentReponse | MeasurmentReponse): LastMeasurmentReponse {
    const minTankLevel = 2340;
    const maxTankLevel = 366;
    const percentage = Math.floor(((meas.waterLevel - minTankLevel)/(maxTankLevel - minTankLevel)) * 100);
    return Object.assign({}, {...meas, waterLevel: percentage});
  }
}

import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MeasurmentType } from '../../enums/measurment-type.enum';
import { TimeWindow } from '../../enums/time-window.enum';

import { MeasurmentsService } from '../../services/measurments/measurments.service';

import { MeasurmentRequest } from '../../interfaces/measurment-request.interface';
import { MeasurmentReponse } from '../../interfaces/measurment-response.interface';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  public singleMeasurment$: Subject<MeasurmentReponse>;
  public measurmentArray$: Subject<Array<MeasurmentReponse>>;
  public lastMeasurment$: Subject<MeasurmentReponse>;

  private queryOptions: MeasurmentRequest;
  private refreshData$: BehaviorSubject<MeasurmentRequest>;

  constructor(private measurmentService: MeasurmentsService) {
    this.singleMeasurment$ = new Subject();
    this.measurmentArray$ = new Subject();
    this.queryOptions = {
      tankId: 0,
      measurmentType: MeasurmentType.waterLevel,
      timeWindow: TimeWindow.day,
    };
    this.refreshData$ = new BehaviorSubject(this.queryOptions);
  }

  ngOnInit(): void {
    this.refreshData$
      .pipe(
        switchMap((queryOpt) => {
          return this.measurmentService.getMeasurment(
            queryOpt.tankId,
            queryOpt.measurmentType,
            queryOpt.timeWindow
          );
        }),
        tap((measurmentArray) => {
          this.measurmentArray$.next(measurmentArray);
        })
      )
      .subscribe();

    this.measurmentService
      .getLastMeasurment(
        this.queryOptions.tankId,
        this.queryOptions.measurmentType
      )
      .subscribe((data) => {
        this.singleMeasurment$.next(data);
      });
  }

  public getNewDataInTimeWindow(timeWindow: TimeWindow): void {
    this.queryOptions.timeWindow = timeWindow;
    this.refreshData$.next(this.queryOptions);
  }
}

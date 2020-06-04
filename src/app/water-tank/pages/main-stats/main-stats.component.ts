import { Component, OnInit } from '@angular/core';
import { Observable } from '@influxdata/influxdb-client/dist/observable';
import { LastMeasurmentReponse } from 'api/interfaces/last-measurment-response.interface copy';
import { MeasurmentsService } from '../../services/measurments/measurments.service';
import { Subject, zip, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  public singleMeasurmentTank0$: Subject<LastMeasurmentReponse>;
  public singleMeasurmentTank1$: Subject<LastMeasurmentReponse>;
  public refreshData$: BehaviorSubject<void>;

  constructor(private measurmentService: MeasurmentsService) {
    this.singleMeasurmentTank0$ = new Subject();
    this.singleMeasurmentTank1$ = new Subject();
    this.refreshData$ = new BehaviorSubject(null);
  }

  public ngOnInit(): void {
    this.initData();
  }

  public refreshData(): void {}

  private initData() {
    this.refreshData$
      .pipe(
        switchMap(() => {
          return zip(this.getSingleMeasurment(0), this.getSingleMeasurment(1));
        })
      )
      .subscribe(
        ([meas0, meas1]: [LastMeasurmentReponse, LastMeasurmentReponse]) => {
          this.singleMeasurmentTank0$.next(meas0);
          this.singleMeasurmentTank1$.next(meas1);
        }
      );
  }

  private getSingleMeasurment(
    tankId: number
  ): Observable<LastMeasurmentReponse> {
    return this.measurmentService.getLastMeasurment(tankId);
  }
}

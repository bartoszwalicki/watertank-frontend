import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from '@influxdata/influxdb-client/dist/observable';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { LastMeasurementResponse } from '../../interfaces/last-measurement-response.interface';
import { MeasurementsService } from '../../services/measurements/measurements.service';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  public singleMeasurementTank0$: Subject<LastMeasurementResponse>;
  public singleMeasurementTank1$: Subject<LastMeasurementResponse>;
  public refreshData$: BehaviorSubject<void>;
  public isLoading: boolean;

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkHiddenDocument();
  }

  constructor(
    private measurementService: MeasurementsService,
    private router: Router
  ) {
    this.singleMeasurementTank0$ = new Subject();
    this.singleMeasurementTank1$ = new Subject();
    this.refreshData$ = new BehaviorSubject(null);
    this.isLoading = false;
  }

  public ngOnInit(): void {
    this.initData();
  }

  public refreshData(): void {
    this.refreshData$.next();
  }

  public showCharts(tankId: number): void {
    this.router.navigate([`chart/${tankId}`]);
  }

  public checkHiddenDocument() {
    if (!document.hidden) {
      this.refreshData();
    }
  }

  private initData() {
    this.refreshData$
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(() => {
          return zip(
            this.getSingleMeasurement(1),
            this.getSingleMeasurement(2)
          );
        })
      )
      .subscribe(
        ([meas0, meas1]: [
          LastMeasurementResponse,
          LastMeasurementResponse
        ]) => {
          this.singleMeasurementTank0$.next(meas0);
          this.singleMeasurementTank1$.next(meas1);
          this.isLoading = false;
        }
      );
  }

  private getSingleMeasurement(
    tankId: number
  ): Observable<LastMeasurementResponse> {
    return this.measurementService.getLastMeasurment(tankId);
  }
}

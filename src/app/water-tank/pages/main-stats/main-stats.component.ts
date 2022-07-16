import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from '@influxdata/influxdb-client/dist/observable';
import { LastMeasurmentReponse } from 'api/interfaces/last-measurment-response.interface copy';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MeasurmentsService } from '../../services/measurments/measurments.service';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  public singleMeasurmentTank0$: Subject<LastMeasurmentReponse>;
  public singleMeasurmentTank1$: Subject<LastMeasurmentReponse>;
  public refreshData$: BehaviorSubject<void>;
  public isLoading: boolean;

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    this.checkHiddenDocument();
  }

  constructor(
    private measurmentService: MeasurmentsService,
    private router: Router
  ) {
    this.singleMeasurmentTank0$ = new Subject();
    this.singleMeasurmentTank1$ = new Subject();
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
          return zip(this.getSingleMeasurment(1), this.getSingleMeasurment(2));
        })
      )
      .subscribe(
        ([meas0, meas1]: [LastMeasurmentReponse, LastMeasurmentReponse]) => {
          this.singleMeasurmentTank0$.next(meas0);
          this.singleMeasurmentTank1$.next(meas1);
          this.isLoading = false;
        }
      );
  }

  private getSingleMeasurment(
    tankId: number
  ): Observable<LastMeasurmentReponse> {
    return this.measurmentService.getLastMeasurment(tankId);
  }
}

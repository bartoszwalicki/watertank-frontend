import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeWindow } from 'api/enums/time-window.enum';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MeasurementRequest } from '../../interfaces/measurement-request.interface';
import { MeasurementResponse } from '../../interfaces/measurement-response.interface';
import { MeasurementsService } from '../../services/measurements/measurements.service';

@Component({
  selector: 'app-tank-chart',
  templateUrl: './tank-chart.component.html',
  styleUrls: ['./tank-chart.component.scss'],
})
export class TankChartComponent implements OnInit {
  public waterMeasurmentArray$: Subject<Array<MeasurementResponse>>;
  public isLoading: boolean;

  private queryOptions: MeasurementRequest;
  private refreshData$: BehaviorSubject<MeasurementRequest>;

  constructor(
    private measurementService: MeasurementsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.waterMeasurmentArray$ = new Subject();
    this.queryOptions = {
      tankId: this.route.snapshot.params.tankId,
      timeWindow: TimeWindow.day,
    };
    this.refreshData$ = new BehaviorSubject(this.queryOptions);
  }

  ngOnInit(): void {
    this.refreshData$
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((queryOpt) => {
          return this.measurementService.getMeasurment(
            queryOpt.tankId,
            queryOpt.timeWindow
          );
        }),
        tap((measurmentArray) => {
          this.waterMeasurmentArray$.next(measurmentArray);
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  public backToMainPage(): void {
    this.router.navigate(['']);
  }

  public getNewDataInTimeWindow(timeWindow: TimeWindow): void {
    this.queryOptions.timeWindow = timeWindow;
    this.refreshData$.next(this.queryOptions);
  }
}

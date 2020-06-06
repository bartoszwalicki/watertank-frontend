import { Component, OnInit } from '@angular/core';
import { TimeWindow } from 'api/enums/time-window.enum';
import { MeasurmentReponse } from 'api/interfaces/measurment-response.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MeasurmentRequest } from '../../interfaces/measurment-request.interface';
import { MeasurmentsService } from '../../services/measurments/measurments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tank-chart',
  templateUrl: './tank-chart.component.html',
  styleUrls: ['./tank-chart.component.scss'],
})
export class TankChartComponent implements OnInit {
  public waterMeasurmentArray$: Subject<Array<MeasurmentReponse>>;
  public isLoading: boolean;

  private queryOptions: MeasurmentRequest;
  private refreshData$: BehaviorSubject<MeasurmentRequest>;

  constructor(
    private measurmentService: MeasurmentsService,
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
          return this.measurmentService.getMeasurment(
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

import { Component, OnInit } from '@angular/core';
import { MeasurmentsService } from '../../services/measurments/measurments.service';
import { MeasurmentType } from '../../enums/measurment-type.enum';
import { TimeWindow } from '../../enums/time-window.enum';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MeasurmentReponse } from '../../interfaces/measurment-response.interface';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  public singleMeasurment$: Subject<MeasurmentReponse>;
  public measurmentArray$: Subject<Array<MeasurmentReponse>>;

  constructor(private measurmentService: MeasurmentsService) {
    this.singleMeasurment$ = new Subject();
    this.measurmentArray$ = new Subject();
  }

  ngOnInit(): void {
    this.measurmentService
      .getMeasurment(0, MeasurmentType.temperature)
      .pipe(
        tap((measurmentArray) => {
          this.measurmentArray$.next(measurmentArray);
        }),
        tap((measurmentArray) => {
          this.singleMeasurment$.next(measurmentArray.pop());
        })
      )
      .subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { MeasurmentsService } from '../../services/measurments/measurments.service';
import { MeasurmentType } from '../../enums/measurment-type.enum';
import { TimeWindow } from '../../enums/time-window.enum';

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss'],
})
export class MainStatsComponent implements OnInit {
  constructor(private measurmentService: MeasurmentsService) {}

  ngOnInit(): void {
    this.measurmentService
      .getMeasurment(0, MeasurmentType.temperature)
      .subscribe((data) => console.log(data));

    this.measurmentService
      .getMeasurment(0, MeasurmentType.temperature, TimeWindow.week)
      .subscribe((data) => console.log(data));

    this.measurmentService
      .getMeasurment(0, MeasurmentType.temperature, TimeWindow.month)
      .subscribe((data) => console.log(data));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { LastMeasurmentReponse } from 'api/interfaces/last-measurment-response.interface copy';
import { Observable } from 'rxjs';
import { MeasurmentsService } from '../../services/measurments/measurments.service';

@Component({
  selector: 'app-single-stat',
  templateUrl: './single-stat.component.html',
  styleUrls: ['./single-stat.component.scss'],
})
export class SingleStatComponent implements OnInit {
  @Input() tankId: number;

  public singleMeasurment: Observable<LastMeasurmentReponse>;

  constructor(private measurmentService: MeasurmentsService) {}

  public ngOnInit(): void {
    this.singleMeasurment = this.getData();
  }

  public roundData(data: number): number {
    return Math.round(data * 100) / 100;
  }

  private getData(): Observable<LastMeasurmentReponse> {
    return this.measurmentService.getLastMeasurment(this.tankId);
  }
}

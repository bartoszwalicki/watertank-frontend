import { Component, OnInit, Input } from '@angular/core';
import { MeasurmentReponse } from '../../interfaces/measurment-response.interface';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-stat',
  templateUrl: './single-stat.component.html',
  styleUrls: ['./single-stat.component.scss'],
})
export class SingleStatComponent implements OnInit {
  @Input() singleMeasurment: Observable<MeasurmentReponse>;

  ngOnInit(): void {}

  public roundData(data: number): number {
    return Math.round(data * 100) / 100;
  }
}

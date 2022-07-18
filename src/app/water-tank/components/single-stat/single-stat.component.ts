import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LastMeasurementResponse } from '../../interfaces/last-measurement-response.interface';

@Component({
  selector: 'app-single-stat',
  templateUrl: './single-stat.component.html',
  styleUrls: ['./single-stat.component.scss'],
})
export class SingleStatComponent {
  @Input() singleMeasurement$: Observable<LastMeasurementResponse>;
}

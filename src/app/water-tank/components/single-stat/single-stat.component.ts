import { Component, Input } from '@angular/core';
import { LastMeasurementResponse } from 'api/interfaces/last-measurement-response.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-stat',
  templateUrl: './single-stat.component.html',
  styleUrls: ['./single-stat.component.scss'],
})
export class SingleStatComponent {
  @Input() singleMeasurement$: Observable<LastMeasurementResponse>;
}

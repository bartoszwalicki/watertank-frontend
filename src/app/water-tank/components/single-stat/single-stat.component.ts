import { Component, Input, OnInit } from '@angular/core';
import { LastMeasurmentReponse } from 'api/interfaces/last-measurment-response.interface copy';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-stat',
  templateUrl: './single-stat.component.html',
  styleUrls: ['./single-stat.component.scss'],
})
export class SingleStatComponent {
  @Input() singleMeasurment$: Observable<LastMeasurmentReponse>;
}

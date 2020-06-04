import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';

import { MeasurmentReponse } from '../../interfaces/measurment-response.interface';
import { TimeWindow } from '../../enums/time-window.enum';

@Component({
  selector: 'app-chart-with-time-scope',
  templateUrl: './chart-with-time-scope.component.html',
  styleUrls: ['./chart-with-time-scope.component.scss'],
})
export class ChartWithTimeScopeComponent implements OnInit {
  @Input() public inputData: Observable<Array<MeasurmentReponse>>;

  @Output() public timeWindowChangedEvent: EventEmitter<TimeWindow>;

  public timeWindowForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timeWindowChangedEvent = new EventEmitter<TimeWindow>();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.timeWindowForm = this.fb.group({
      timeWindow: ['1d'],
    });
    this.timeWindowForm
      .get('timeWindow')
      .valueChanges.subscribe((currentValue) => {
        this.timeWindowChangedEvent.next(currentValue);
      });
  }
}

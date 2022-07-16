import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { TimeWindow } from '../../enums/time-window.enum';
import { MeasurementResponse } from '../../interfaces/measurement-response.interface';

@Component({
  selector: 'app-chart-with-time-scope',
  templateUrl: './chart-with-time-scope.component.html',
  styleUrls: ['./chart-with-time-scope.component.scss'],
})
export class ChartWithTimeScopeComponent implements OnInit {
  @Input() public inputData: Observable<Array<MeasurementResponse>>;

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

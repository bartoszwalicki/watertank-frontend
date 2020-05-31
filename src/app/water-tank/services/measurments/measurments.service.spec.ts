import { TestBed } from '@angular/core/testing';

import { MeasurmentsService } from './measurments.service';

describe('MeasurmentsService', () => {
  let service: MeasurmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

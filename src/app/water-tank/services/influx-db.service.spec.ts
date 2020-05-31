import { TestBed } from '@angular/core/testing';

import { InfluxDbService } from './influx-db.service';

describe('InfluxDbService', () => {
  let service: InfluxDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluxDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

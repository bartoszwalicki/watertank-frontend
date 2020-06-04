import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWithTimeScopeComponent } from './chart-with-time-scope.component';

describe('ChartWithTimeScopeComponent', () => {
  let component: ChartWithTimeScopeComponent;
  let fixture: ComponentFixture<ChartWithTimeScopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartWithTimeScopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartWithTimeScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

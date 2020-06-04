import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankChartComponent } from './tank-chart.component';

describe('TankChartComponent', () => {
  let component: TankChartComponent;
  let fixture: ComponentFixture<TankChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

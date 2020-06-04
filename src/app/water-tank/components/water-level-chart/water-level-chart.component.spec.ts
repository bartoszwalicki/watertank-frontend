import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLevelChartComponent } from './water-level-chart.component';

describe('WaterLevelChartComponent', () => {
  let component: WaterLevelChartComponent;
  let fixture: ComponentFixture<WaterLevelChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterLevelChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLevelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WaterTankRoutingModule } from './water-tank-routing.module';

import { TankComponent } from './components/tank/tank.component';
import { MainStatsComponent } from './pages/main-stats/main-stats.component';
import { SingleStatComponent } from './components/single-stat/single-stat.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartWithTimeScopeComponent } from './components/chart-with-time-scope/chart-with-time-scope.component';
import { WaterLevelChartComponent } from './components/water-level-chart/water-level-chart.component';

@NgModule({
  declarations: [
    TankComponent,
    MainStatsComponent,
    SingleStatComponent,
    ChartWithTimeScopeComponent,
    WaterLevelChartComponent,
  ],
  imports: [
    CommonModule,
    WaterTankRoutingModule,
    NgxChartsModule,
    ReactiveFormsModule,
  ],
})
export class WaterTankModule {}

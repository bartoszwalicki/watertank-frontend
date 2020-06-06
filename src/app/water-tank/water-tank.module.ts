import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { WaterTankRoutingModule } from './water-tank-routing.module';

import { TankComponent } from './components/tank/tank.component';
import { MainStatsComponent } from './pages/main-stats/main-stats.component';
import { SingleStatComponent } from './components/single-stat/single-stat.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartWithTimeScopeComponent } from './components/chart-with-time-scope/chart-with-time-scope.component';
import { ChartComponent } from './components/chart/chart.component';
import { TankChartComponent } from './pages/tank-chart/tank-chart.component';

@NgModule({
  declarations: [
    TankComponent,
    MainStatsComponent,
    SingleStatComponent,
    ChartWithTimeScopeComponent,
    ChartComponent,
    TankChartComponent,
  ],
  imports: [
    CommonModule,
    WaterTankRoutingModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
})
export class WaterTankModule {}

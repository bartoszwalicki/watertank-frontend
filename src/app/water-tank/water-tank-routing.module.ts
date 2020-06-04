import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainStatsComponent } from './pages/main-stats/main-stats.component';
import { TankChartComponent } from './pages/tank-chart/tank-chart.component';

const routes: Routes = [
  {
    path: '',
    component: MainStatsComponent,
  },
  { path: 'chart/:tankId', component: TankChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterTankRoutingModule {}

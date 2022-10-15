import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainStatsComponent } from './pages/main-stats/main-stats.component';

const routes: Routes = [
  {
    path: '',
    component: MainStatsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterTankRoutingModule {}

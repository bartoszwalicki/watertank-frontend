import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterTankRoutingModule } from './water-tank.routing.module';

import { TankComponent } from './components/tank/tank.component';
import { MainStatsComponent } from './pages/main-stats/main-stats.component';

@NgModule({
  declarations: [TankComponent, MainStatsComponent],
  imports: [CommonModule, WaterTankRoutingModule],
})
export class WaterTankModule {}

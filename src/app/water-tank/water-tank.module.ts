import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { WaterTankRoutingModule } from './water-tank-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SingleStatComponent } from './components/single-stat/single-stat.component';
import { TankComponent } from './components/tank/tank.component';
import { MainStatsComponent } from './pages/main-stats/main-stats.component';

@NgModule({
  declarations: [TankComponent, MainStatsComponent, SingleStatComponent],
  imports: [
    CommonModule,
    WaterTankRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    SharedModule,
  ],
})
export class WaterTankModule {}

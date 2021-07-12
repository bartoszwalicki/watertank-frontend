import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppUpdaterService } from './services/app-updater.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule],
  providers: [AppUpdaterService],
})
export class UpdaterModule {}

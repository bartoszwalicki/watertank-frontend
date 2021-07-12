import { Component } from '@angular/core';
import { AppUpdaterService } from './updater/services/app-updater.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private updater: AppUpdaterService) {}
}

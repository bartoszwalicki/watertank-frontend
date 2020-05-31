import { Component } from '@angular/core';
import { InfluxDbService } from './water-tank/services/influx-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'watertank-frontend';

  /**
   *
   */
  constructor(private influxdb: InfluxDbService) {
    this.influxdb.getMeasurment().subscribe((result) => {
      console.log(result);
    });
  }
}

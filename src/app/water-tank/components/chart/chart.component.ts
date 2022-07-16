import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData } from '../../interfaces/chart-data.interface';
import { MeasurementResponse } from '../../interfaces/measurement-response.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() private inputData: Observable<Array<MeasurementResponse>>;

  waterLevelChartData: ChartData[];
  temperatureChartData: ChartData[];

  legend: boolean;
  showLabels: boolean;
  animations: boolean;
  xAxisLabel: string;

  colorSchemeWaterLevel: { domain: Array<string> };
  colorSchemeTemperature: { domain: Array<string> };

  constructor() {
    this.legend = false;
    this.showLabels = true;
    this.animations = true;
    this.xAxisLabel = 'Czas';
    this.colorSchemeWaterLevel = {
      domain: ['#5AA454'],
    };
    this.colorSchemeTemperature = {
      domain: ['#fc6603'],
    };
  }

  ngOnInit(): void {
    this.inputData.subscribe((dataArray) => {
      let tmp = [];
      let tmp2 = [];

      const waterLevelData = dataArray.filter((elem) => elem.waterLevel);
      const temperatureData = dataArray.filter((elem) => elem.temperature);

      waterLevelData.forEach((element) => {
        tmp.push({ name: new Date(element.time), value: element.waterLevel });
      });
      tmp2.push({ name: 'Poziom wody', series: tmp });

      this.waterLevelChartData = tmp2;

      tmp = [];
      tmp2 = [];

      temperatureData.forEach((element) => {
        tmp.push({ name: new Date(element.time), value: element.temperature });
      });
      tmp2.push({ name: 'Temperatura', series: tmp });

      this.temperatureChartData = tmp2;
    });
  }
}

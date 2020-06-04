import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MeasurmentReponse } from '../../interfaces/measurment-response.interface';
import { ChartData } from '../../interfaces/chart-data.interface';

@Component({
  selector: 'app-water-level-chart',
  templateUrl: './water-level-chart.component.html',
  styleUrls: ['./water-level-chart.component.scss'],
})
export class WaterLevelChartComponent implements OnInit {
  @Input() private inputData: Observable<Array<MeasurmentReponse>>;

  chartData: ChartData[];

  legend: boolean;
  showLabels: boolean;
  animations: boolean;
  xAxis: boolean;
  yAxis: boolean;
  showYAxisLabel: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  timeline: boolean;

  colorScheme: { domain: Array<string> };

  constructor() {
    this.legend = false;
    this.showLabels = true;
    this.animations = true;
    this.xAxis = true;
    this.yAxis = true;
    this.showYAxisLabel = true;
    this.showXAxisLabel = true;
    this.xAxisLabel = 'Czas';
    this.yAxisLabel = 'Poziom wody';
    this.timeline = true;
    this.colorScheme = {
      domain: [
        '#5AA454',
        '#E44D25',
        '#CFC0BB',
        '#7aa3e5',
        '#a8385d',
        '#aae3f5',
      ],
    };
  }

  ngOnInit(): void {
    this.inputData.subscribe((dataArray) => {
      const tmp = [];
      const tmp2 = [];
      dataArray.forEach((element) => {
        tmp.push({ name: new Date(element.time), value: element.value });
      });
      tmp2.push({ name: 'Poziom wody', series: tmp });
      this.chartData = tmp2;
    });
  }
}

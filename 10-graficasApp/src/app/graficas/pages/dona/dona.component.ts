import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
    // Doughnut
    public doughnutChartLabels: string[] = [
      'Download Sales',
      'In-Store Sales',
      'Mail-Order Sales',
      'Other'
    ];

    public colors: Color[] = [
      '#501EFA',
      '#E01EFA',
      '#981EFA'
     ]

    public doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [350, 450, 100, 150], backgroundColor: this.colors }
      ],
    };
    public doughnutChartType: ChartType = 'doughnut';
  
    // events
    public chartClicked({
      event,
      active,
    }: {
      event: ChartEvent;
      active: object[];
    }): void {
      console.log(event, active);
    }
  
    public chartHovered({
      event,
      active,
    }: {
      event: ChartEvent;
      active: object[];
    }): void {
      console.log(event, active);
    }
}

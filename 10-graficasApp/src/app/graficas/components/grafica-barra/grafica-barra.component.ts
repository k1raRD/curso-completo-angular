import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styles: [
  ]
})
export class GraficaBarraComponent implements OnInit{

  @Input() bubble: boolean = false;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartPlugins = [DataLabelsPlugin];

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';

  @Input() public barChartData!: ChartData;// = {
    // labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    // datasets: [
    //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', backgroundColor: '#39F7F4', hoverBackgroundColor: '#3946F7' },
    //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', backgroundColor: '#3982F7', hoverBackgroundColor: '#3946F7' },
    //   { data: [8, 38, 40, 24, 86, 100, 90], label: 'Series C', backgroundColor: '#39BEF7', hoverBackgroundColor: '#3946F7' },
    // ],
  //};

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];

    this.barChartData.datasets[1].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];

    this.barChartData.datasets[2].data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];

    this.chart?.update();
  }

  ngOnInit(): void {
    if(this.bubble) {
      this.barChartType = 'bubble';
    }
  }
}

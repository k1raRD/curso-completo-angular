import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../services/graficas.service';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';


@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [
  ]
})
export class DonaHttpComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: string[] = [
    // 'Download Sales',
    // 'In-Store Sales',
    // 'Mail-Order Sales',
    // 'Other'
  ];

  public doughnutData: any[] = []

  public colors: Color[] = [
    '#501EFA',
    '#E01EFA',
    '#981EFA'
  ]

  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private graficaService: GraficasService) { }

  ngOnInit(): void {
    // this.graficaService.getUsuariosRedesSociales().subscribe({
    //   next: (data) => {
    //     const labels = Object.keys(data);
    //     const values = Object.values(data);

    //     this.doughnutChartLabels = labels;
    //     this.doughnutData = values;

    //     this.doughnutChartData = {
    //       labels: this.doughnutChartLabels,
    //       datasets: [
    //         { data: this.doughnutData, backgroundColor: this.colors }
    //       ],
    //     };
    //   },
    //   error: (e) => {
    //     console.error(e);
    //   }
    // })

    this.graficaService.getUsuariosRedesSocialesDonaData()
    .subscribe(({labels, values}) => {
      this.doughnutChartLabels = labels;
      this.doughnutData = values;

      this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          { data: this.doughnutData, backgroundColor: this.colors }
        ],
      };
    });
  }

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

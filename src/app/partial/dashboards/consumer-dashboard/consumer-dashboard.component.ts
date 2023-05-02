import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-consumer-dashboard',
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.scss']
})
export class ConsumerDashboardComponent implements OnInit {


  @ViewChild("areaChart") chart!: ChartComponent;
  public chartOptions!: any;
  monthDataSeries: any

  constructor() { 

     //area chart static data
     this.monthDataSeries = {
      prices: [
        950,
        940,
        950,
        940,
        930,
        920,
        930,
        920,
        950,
        970,
        900,
      ],
      dates: [
        "16 April 2023",
        "17 April 2023",
        "18 April 2023",
        "19 April 2023",
        "20 April 2023",
        "21 April 2023",
        "22 April 2023",
        "23 April 2023",
        "24 April 2023",
        "25 April 2023",
        "26 April 2023",
      ]
    }
    this.chartOptions = {
      series: [
        {
          name: "Coal Lifting",
          data: this.monthDataSeries.prices
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "(In Metric Tonne)",
        align: "left"
      },
      labels: this.monthDataSeries.dates,
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  ngOnInit(): void {
  }

}

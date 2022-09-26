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
        910,
        920,
        940,
        960,
        980,
        970,
        1000,
        1020,
        1000,
        1010,
      ],
      dates: [
        "16 Sep 2022",
        "17 Sep 2022",
        "18 Sep 2022",
        "19 Sep 2022",
        "20 Sep 2022",
        "21 Sep 2022",
        "22 Sep 2022",
        "23 Sep 2022",
        "24 Sep 2022",
        "25 Sep 2022",
        "26 Sep 2022",
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

import { Component,  OnInit,  ViewChild, NgZone } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

export type pieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

import { MapsAPILoader } from '@agm/core'
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("areaChart") chart!: ChartComponent;
  public chartOptions!: any;
  monthDataSeries1: any
  previous: any;
  @ViewChild("pieChart") pieChart!: ChartComponent;
  resLocationOfCollaries:any;
  openedWindow: number = 0;
  public pieChartOptions: any;
  dashboardDetails:any;
  
  constructor(public configService: ConfigService, private commonService:CommonApiCallService,
    private apiService:CallApiService, private error:ErrorHandlerService) {

    //area chart static data
    this.monthDataSeries1 = {
      prices: [
        200,
        220,
        180,
        190,
        220,
        180,
        220,
        200,
        220,
        180,
        190,
        220,
        180,
        220,
        200,
        220,
        180,
        190,
        220,
        180,
        220,
      ],
      dates: [
        "01 Sep 2022",
        "02 Sep 2022",
        "03 Sep 2022",
        "04 Sep 2022",
        "15 Sep 2022",
        "06 Sep 2022",
        "07 Sep 2022",
        "08 Sep 2022",
        "09 Sep 2022",
        "10 Sep 2022",
        "11 Sep 2022",
        "12 Sep 2022",
        "13 Sep 2022",
        "15 Sep 2022",
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
          name: "STOCK ABC",
          data: this.monthDataSeries1.prices
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
      // subtitle: {
      //   text: "Price Movements",
      //   align: "left"
      // },
      labels: this.monthDataSeries1.dates,
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

    //pie chart static data
    this.pieChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.dashboardData();
    this. getLocationOfCollaries();
  }

  dashboardData(){
    this.commonService.getDashboardData().subscribe({
      next: (response: any) => {
        this.dashboardDetails =response.responseData;
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  //------------------------------------------------------ map codeing start heare ----------------------------------------------------------------// 
  
  getLocationOfCollaries(){
    this.apiService.setHttp('get', "Dashboard/LocationOfCollaries", false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.resLocationOfCollaries = res.responseData;
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

  clickedMarker(infoWindow: any) {
    if (this.previous) { // previous window close
      this.openedWindow = 0;
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  isInfoWindowOpen(id: any) {
    return this.openedWindow == id; // alternative: check if id is in array
  }

  //------------------------------------------------------ map codeing end heare ----------------------------------------------------------------// 
}

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
  }

  ngOnInit(): void {
    this.dashboardData();
    this. getLocationOfCollaries();
  }

  dashboardData(){
    this.commonService.getDashboardData().subscribe({
      next: (response: any) => {
        this.dashboardDetails =response.responseData;
            //pie chart static data
    this.pieChartOptions = {
      series: [this.dashboardDetails?.annualQTY, this.dashboardDetails?.balanceAnnualQTY],
      colors: ['#5C4742', '#A5978B'], //add color
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Allocated", "Balance"],
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

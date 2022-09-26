import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ChartComponent } from 'ng-apexcharts';
import { ConfigService } from 'src/app/configs/config.service';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
@Component({
  selector: 'app-consumer-details',
  templateUrl: './consumer-details.component.html',
  styleUrls: ['./consumer-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ConsumerDetailsComponent implements OnInit, OnDestroy  {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['srno', 'Challan_No', 'Vehicle_No', 'Mineral','Grade','Colliery_Name','Destination','Quantity'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | any;


  @ViewChild("areaChart") chart!: ChartComponent;
  public chartOptions!: any;
  monthDataSeries: any;

  @ViewChild("pieChart") pieChart!: ChartComponent;
  public pieChartOptions: any;
  dashboardDetails:any;

  consumerTypeFlag:any;

  constructor (public configService: ConfigService, private commonService:CommonApiCallService,
    private apiService:CallApiService, private error:ErrorHandlerService) {
    //area chart static data
    this.monthDataSeries = {
      prices: [950,910,920,940,960,980,970,1000,1020,1000,1010],
      dates: ["16 Sep 2022","17 Sep 2022","18 Sep 2022","19 Sep 2022","20 Sep 2022",
        "21 Sep 2022","22 Sep 2022","23 Sep 2022","24 Sep 2022","25 Sep 2022","26 Sep 2022",
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
    this.dashboardData();
    this.consumerTypeFlag = sessionStorage.getItem('consumerType');
  }

  ngOnDestroy() {
    sessionStorage.removeItem('consumerType');
  }

  dashboardData(){
    this.commonService.getDashboardData().subscribe({
      next: (response: any) => {
        this.dashboardDetails =response.responseData;
            //pie chart static data
    this.pieChartOptions = {
      series: [this.dashboardDetails?.annualQTY, this.dashboardDetails?.balanceAnnualQTY],
      colors: ['#fbaa5d', '#2EBDC2'], //add color
      chart: {
        width: 280,
        height: 120,
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


}


export interface PeriodicElement {
  srno: number;
  Challan_No: number;
  Vehicle_No: number;
  Mineral: string;
  Grade: string;
  Colliery_Name: string;
  Destination: string;
  Quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    srno: 1,
    Challan_No: 123625658,
    Vehicle_No: 1.0079,
    Mineral: 'H',
    Grade:'G3',
        Colliery_Name: 'dsfhsdhfjsdhf',
        Destination: 'djfhsdhfshfsofh',
        Quantity: 123333
  }
];
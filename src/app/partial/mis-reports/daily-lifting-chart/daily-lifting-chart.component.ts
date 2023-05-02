import { Component, OnInit } from '@angular/core';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-daily-lifting-chart',
  templateUrl: './daily-lifting-chart.component.html',
  styleUrls: ['./daily-lifting-chart.component.scss']
})
export class DailyLiftingChartComponent implements OnInit {

  collieryArray: any;
  constructor(
    public commonService: CommonApiCallService,
    public error: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.getCollieryData();
  }

  getCollieryData() {
    this.commonService.getCollieryNameList().subscribe({
      next: (response: any) => {
        this.collieryArray = response//.push({ 'value': 0, 'text': 'All State' }, ...response);
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

}

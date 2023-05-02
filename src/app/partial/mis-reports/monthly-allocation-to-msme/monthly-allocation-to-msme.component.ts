import { Component, OnInit } from '@angular/core';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-monthly-allocation-to-msme',
  templateUrl: './monthly-allocation-to-msme.component.html',
  styleUrls: ['./monthly-allocation-to-msme.component.scss']
})
export class MonthlyAllocationToMsmeComponent implements OnInit {
  collieryArray:any;
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

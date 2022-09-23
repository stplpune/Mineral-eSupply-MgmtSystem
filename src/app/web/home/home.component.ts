import { Component, OnInit } from '@angular/core';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dashboardDetails:any;

  constructor(
    public commonService: CommonApiCallService,
    public error: ErrorHandlerService,
  ) { 
    
  }

  ngOnInit(): void {
    this.dashboardData();
  }

  dashboardData(){
    this.commonService.getDashboardData().subscribe({
      next: (response: any) => {
        this.dashboardDetails=response.responseData;
        console.log(response)
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

}

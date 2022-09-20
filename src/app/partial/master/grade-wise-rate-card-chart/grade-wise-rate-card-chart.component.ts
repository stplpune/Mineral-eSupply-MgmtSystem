import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/configs/config.service';
import { ConfirmationComponent } from '../../dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-grade-wise-rate-card-chart',
  templateUrl: './grade-wise-rate-card-chart.component.html',
  styleUrls: ['./grade-wise-rate-card-chart.component.scss']
})
export class GradeWiseRateCardChartComponent implements OnInit {

  constructor(public dialog: MatDialog, public configService:ConfigService) { }

  ngOnInit(): void {
  }


  deleteRecord() {
    const dialog = this.dialog.open(ConfirmationComponent, {
      width: '400px',
      data: '',
      disableClose: this.configService.disableCloseBtnFlag,
    })
    dialog.afterClosed().subscribe(res => {
      
    })
  }
}

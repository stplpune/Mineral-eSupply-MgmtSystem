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
    let obj:any = ConfigService.dialogObj;
    
    obj['p1'] = 'Are you sure you want to delete this record?';
    obj['cardTitle'] = 'Delete';
    obj['successBtnText'] = 'Delete';
    obj['cancelBtnText'] =  'Cancel';

    const dialog = this.dialog.open(ConfirmationComponent, {
      width:this.configService.dialogBoxWidth[0],
      data: obj,
      disableClose: this.configService.disableCloseBtnFlag,
    })
    dialog.afterClosed().subscribe(res => {
      
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-rate-card',
  templateUrl: './add-rate-card.component.html',
  styleUrls: ['./add-rate-card.component.scss']
})
export class AddRateCardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddRateCardComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeModal(flag?: any) {
    this.dialogRef.close(flag);
  }

}

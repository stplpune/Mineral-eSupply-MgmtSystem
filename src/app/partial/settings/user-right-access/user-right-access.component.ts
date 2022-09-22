import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../../master/consumer-registration/consumer-registration.component';

@Component({
  selector: 'app-user-right-access',
  templateUrl: './user-right-access.component.html',
  styleUrls: ['./user-right-access.component.scss']
})
export class UserRightAccessComponent implements OnInit {


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','select'];
  dataSource = new MatTableDataSource<any>;
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



  constructor() { }

  ngOnInit(): void {
  }

}

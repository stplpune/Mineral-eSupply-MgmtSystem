import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../dialogs/change-password/change-password.component';
import { LogoutComponent } from '../../dialogs/logout/logout.component';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public sidebarservice: SidebarService ,public dialog: MatDialog) { }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  title: any;
  ngOnInit(): void {
    this.title = document.title;
  }
  openChangePasswordModal(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '350px',
      data: '',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
    });
  }


  logOut(){
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '350px',
      data: '',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
    });
  }



}

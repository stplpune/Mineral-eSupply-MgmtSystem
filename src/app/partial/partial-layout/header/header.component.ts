import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../../dialogs/change-password/change-password.component';
import { LogoutComponent } from '../../dialogs/logout/logout.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import { AddUserComponent } from '../../master/register-user/add-user/add-user.component';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeTheme: any;
  loggedInData: any;
  @HostBinding('class') className = '';
  constructor(
    public sidebarservice: SidebarService, 
    private overlay: OverlayContainer, 
    private ThemeService: ThemeService, 
    public dialog: MatDialog, 
    private router:Router,
    public error: ErrorHandlerService,
    public apiService: CallApiService,
    public localStorageData: WebStorageService) {
    }

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
    sessionStorage.getItem('theme') ? this.onClickThemeChange(sessionStorage.getItem('theme')) : this.onClickThemeChange('light');
    this.ThemeService.getActiveTheme().subscribe(x => {
      this.activeTheme = x
    });
  }
  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '650px',
      data: '',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  getUserDataById(id: any) {
    this.apiService.setHttp('get', "UserRegistration/GetUserDetailsById?Id=" + id, false, false, false, 'WBMiningService');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === 200 && res.responseData) {
          this.loggedInData = res.responseData[0];
          this.openUserModal(this.loggedInData);
        } else {
        }
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    });
  }
  
  openUserModal(obj?: any){
    obj['cardTitle'] = 'Profile';
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      height: 'auto',
      disableClose: true,
      data: obj ? obj : '',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      
    });
  }

  onClickThemeChange(themeName: any): void {
    sessionStorage.setItem('theme', themeName);
    this.ThemeService.setActiveThem(themeName);
    this.activeTheme = themeName;
    const darkClassName = 'darkMode';
    this.className = themeName == 'dark' ? darkClassName : '';
    if (themeName == 'dark') {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }
  }

  logOut() {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '350px',
      data: '',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'Yes') {
        this.localStorageClear();
      }
    });
  }

  localStorageClear() {
    localStorage.clear();
    this.router.navigate(['../home']);
  }
}

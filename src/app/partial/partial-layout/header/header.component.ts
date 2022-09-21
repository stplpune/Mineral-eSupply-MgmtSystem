import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../../dialogs/change-password/change-password.component';
import { LogoutComponent } from '../../dialogs/logout/logout.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { ThemeService } from 'src/app/theme/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeTheme: any;
  @HostBinding('class') className = '';
  constructor(public sidebarservice: SidebarService, private overlay: OverlayContainer, private ThemeService: ThemeService, public dialog: MatDialog, private router:Router) { }

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
      width: '350px',
      data: '',
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
    this.router.navigate(['../login']);
  }
}

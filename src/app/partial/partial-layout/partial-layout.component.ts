import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';

@Component({
  selector: 'app-partial-layout',
  templateUrl: './partial-layout.component.html',
  styleUrls: ['./partial-layout.component.scss']
})
export class PartialLayoutComponent implements OnInit {

  constructor(public sidebarservice: SidebarService) { }
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
  ngOnInit(): void {
  }

}

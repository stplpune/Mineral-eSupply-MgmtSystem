import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss']
})
export class WebLayoutComponent implements OnInit {
  hideHeader: boolean = false;
  hideFooter: boolean = false;

  constructor(private router: Router) {
    if (this.router.url != '/login' && this.router.url != '/forget-password') {
      this.hideHeader = true;
      this.hideFooter = true;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url != '/login' || event.url != '/forget-password') {
        this.hideHeader = false;
        this.hideFooter = false;
      } else {
        this.hideHeader = true;
        this.hideFooter = true;
      }
    })
  }

}

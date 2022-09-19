import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';
import { ShareDataService } from './core/services/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HRMS-Project';
  offline: Boolean = true;

  constructor(private router: Router, private sharedataService: ShareDataService,
    private activatedRoute: ActivatedRoute, private titleService: Title, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.scrollTop();
    this.setTitleName();

    this.onNetworkStatusChange();
    window.addEventListener('online', this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
    window.addEventListener("beforeunload", () => console.log('check'));
  }

  scrollTop() {
    if (event instanceof NavigationEnd) {
      window.scroll(0, 0);
    }
  }

  setTitleName() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild({ activatedRoute: this.activatedRoute });
      rt.data.subscribe((data: { title: string; }) => {
        this.titleService.setTitle(data.title)
      });
    });
  }

  getChild({ activatedRoute }: { activatedRoute: ActivatedRoute; }): any {
    if (activatedRoute.firstChild) {
      return this.getChild({ activatedRoute: activatedRoute.firstChild });
    } else {
      return activatedRoute;
    }
  }

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
    this.offline ? this.successDialog() : this.sharedataService.checkInternetStatus.next(true);
  }

  successDialog() {
  }

}

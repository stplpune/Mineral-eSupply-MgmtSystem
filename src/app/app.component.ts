import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HRMS-Project';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {

  }

  ngOnInit() {
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
}

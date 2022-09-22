import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})

export class WebHeaderComponent implements OnInit {

  activeTheme: any;
  todayDate:any;
  constructor(@Inject(DOCUMENT) private document: any,
    private ThemeService: ThemeService,
    private datePipe: DatePipe,
    public commonService: CommonMethodsService) { }

  ngOnInit(): void {
    this.onChangeFontSize('medium');
    sessionStorage.getItem('theme') ? this.onClickThemeChange(sessionStorage.getItem('theme')) : this.onClickThemeChange('light');
    this.ThemeService.getActiveTheme().subscribe(x => {
      this.activeTheme = x
    });
    let getTodayDate = new Date();
    this.todayDate = this.datePipe.transform(getTodayDate, 'dd/MM/YYYY hh:mm a')?.split(' ');
  }

  onChangeFontSize(value: any){
    if(value == 'small'){
      this.document.body.style.fontSize = '0.8rem';
    }else if(value == 'medium'){
      this.document.body.style.fontSize = '0.85rem';
    }else{
      this.document.body.style.fontSize = '0.9rem';
    }
  }

  onClickThemeChange(themeName: any): void {
    sessionStorage.setItem('theme', themeName);
    this.ThemeService.setActiveThem(themeName);
    this.activeTheme = themeName;
  }

}

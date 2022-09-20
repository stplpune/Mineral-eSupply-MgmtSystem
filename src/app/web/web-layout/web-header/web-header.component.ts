import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme/theme.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})

export class WebHeaderComponent implements OnInit {

  activeTheme: any;
  constructor(@Inject(DOCUMENT) private document: any,
    private ThemeService: ThemeService) { }

  ngOnInit(): void {
    this.onChangeFontSize('medium');
    sessionStorage.getItem('theme') ? this.onClickThemeChange(sessionStorage.getItem('theme')) : this.onClickThemeChange('light');
    this.ThemeService.getActiveTheme().subscribe(x => {
      this.activeTheme = x
    });
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

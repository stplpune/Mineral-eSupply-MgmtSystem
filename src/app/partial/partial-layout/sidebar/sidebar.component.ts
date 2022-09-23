import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  menus: any = [];
  searchFilter = new FormControl('');
  loginPages: any = [];
  loginAfterPages: any;
  getPageList: any;

  constructor(public sidebarservice: SidebarService, private commonMethodsService: CommonMethodsService, private webStorage: WebStorageService) { }

  ngOnInit(): void {
    let data: any = this.webStorage.getAllPageName();
    console.log(data);
    this.sideBarMenu(data)
  }

  sideBarMenu(data: any) {
    this.loginPages = [];
    this.loginAfterPages = data.filter((ele: any) => {
      if (ele.isSidebarMenu == true) {
        return ele;
      }
    })

    this.loginAfterPages.forEach((item: any) => {
      let existing: any = this.loginPages.filter((v: any) => {
        return v.pageGroup == item.pageGroup;
      });
      if (existing.length) {
        let existingIndex: any = this.loginPages.indexOf(existing[0]);
        this.loginPages[existingIndex].pageURL = this.loginPages[existingIndex].pageURL.concat(item.pageURL);
        this.loginPages[existingIndex].pageName = this.loginPages[existingIndex].pageName.concat(item.pageName);
        this.loginPages[existingIndex].type = 'dropdown';
      } else {
        if (typeof item.pageName == 'string')
          item.pageURL = [item.pageURL];
        item.pageName = [item.pageName];
        item.active = false
        this.loginPages.push(item);
      }

    });
    console.log(this.loginPages);
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.loginPages.forEach((element: any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }


  // ---------------------------------------------for search fun start heare ----------------------------------------------//

  ngAfterViewInit() {
    let formValue = this.searchFilter.valueChanges;
    formValue.pipe(
      filter(() => this.searchFilter.valid),
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(() => {
        this.search(this.searchFilter.value)
      })
  }

  search(value: any) {
    let val = value.toLowerCase();
    if (this.commonMethodsService.checkDataType(val == false)) {
      this.ngOnInit();
    } else {
      debugger;
      let data: any = this.webStorage.getAllPageName();
      let result = data.filter((res: any) => {
        return res.pageName?.toLowerCase().includes(val) || res.module?.toLowerCase().includes(val);
      })
      this.sideBarMenu(result);
    }
  }

  clearFilter() {
    this.searchFilter.setValue('');
  }

  // ---------------------------------------------for search fun end heare ----------------------------------------------//
}

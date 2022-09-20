import { AfterViewInit, Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';

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
export class SidebarComponent implements OnInit , AfterViewInit{
  menus: any = [];
  searchFilter = new FormControl('');
  loginPages: any = [];
  loginAfterPages: any;
  getPageList: any;

  constructor(public sidebarservice: SidebarService, private commonMethodsService: CommonMethodsService) {
    // this.menus = sidebarservice.getMenuList();
  }

  ngOnInit(): void {
    let data = [
      { "pageId": "1", "pageType": "1", "pageURL": "dashboard", "pageName": "Dashboard", "pageGroup": "Dashboard", "pageIcon": "fa-solid fa-chart-line", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "2", "pageType": "1", "pageURL": "register-user", "pageName": "Register User", "pageGroup": "Master", "pageIcon": "fa-solid fa-paper-plane", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "3", "pageType": "1", "pageURL": "register-collary", "pageName": "Register Collary", "pageGroup": "Master", "pageIcon": "fa-solid fa-paper-plane", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "4", "pageType": "1", "pageURL": "coal-grade-master", "pageName": "Coal Grade master", "pageGroup": "Master", "pageIcon": "fa-solid fa-paper-plane", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "5", "pageType": "1", "pageURL": "document-master", "pageName": "Document master", "pageGroup": "Master", "pageIcon": "fa-solid fa-paper-plane", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "6", "pageType": "1", "pageURL": "grade-wise-rate-card-chart", "pageName": "Grade wse Rate card Chart", "pageGroup": "Master", "pageIcon": "fa-solid fa-paper-plane", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "7", "pageType": "1", "pageURL": "consumer-registration", "pageName": "Consumer Registrattion", "pageGroup": "Master", "pageIcon": "fa-solid fa-paper-plane", "sortOrder": 1, "isSidebarMenu": true },


      { "pageId": "8", "pageType": "1", "pageURL": "application", "pageName": "Application", "pageGroup": "Application", "pageIcon": "fa fa-shopping-cart", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "9", "pageType": "1", "pageURL": "approval", "pageName": "Approval", "pageGroup": "Application", "pageIcon": "fa fa-shopping-cart", "sortOrder": 1, "isSidebarMenu": true },

      { "pageId": "10", "pageType": "1", "pageURL": "coal-allocation", "pageName": "Coal Allocation", "pageGroup": "Coal Allocation", "pageIcon": "fa-solid fa-briefcase", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "11", "pageType": "1", "pageURL": "booking_payment", "pageName": "Booking & Payment", "pageGroup": "Coal Allocation", "pageIcon": "fa-solid fa-briefcase", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "12", "pageType": "1", "pageURL": "delivery-order", "pageName": "Delivery Order", "pageGroup": "Coal Allocation", "pageIcon": "fa-solid fa-briefcase", "sortOrder": 1, "isSidebarMenu": true },

      { "pageId": "13", "pageType": "1", "pageURL": "loading-slip", "pageName": "Loading Slip", "pageGroup": "Coal Lifting", "pageIcon": "fa-solid fa-hand-holding", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "14", "pageType": "1", "pageURL": "challan_nnvoice-request", "pageName": "Challan/Invoice Request", "pageGroup": "Coal Lifting", "pageIcon": "fa-solid fa-hand-holding", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "15", "pageType": "1", "pageURL": "generate_msme_invoice-challan", "pageName": "Generate MSME Invoice/Challan", "pageGroup": "Coal Lifting", "pageIcon": "fa-solid fa-hand-holding", "sortOrder": 1, "isSidebarMenu": true },


      { "pageId": "16", "pageType": "1", "pageURL": "register-vehicle", "pageName": "Register Vehicle", "pageGroup": "Vehicle Management", "pageIcon": "fa-solid fa-truck-pickup", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "17", "pageType": "1", "pageURL": "vehicle-tracking", "pageName": "Vehicle Tracking", "pageGroup": "Vehicle Management", "pageIcon": "fa-solid fa-truck-pickup", "sortOrder": 1, "isSidebarMenu": true },

      { "pageId": "18", "pageType": "1", "pageURL": "consumers", "pageName": "Consumers", "pageGroup": "Consumer Management", "pageIcon": "fa-solid fa-user-tie", "sortOrder": 1, "isSidebarMenu": true },

      { "pageId": "19", "pageType": "1", "pageURL": "my_profile", "pageName": "My Profile", "pageGroup": "My Profile", "pageIcon": "fa-solid fa-user", "sortOrder": 1, "isSidebarMenu": true },

      { "pageId": "20", "pageType": "1", "pageURL": "daily-lifting-chart", "pageName": "Daily Lifting chart", "pageGroup": "MIS Reports", "pageIcon": "fa-solid fa-file-contract", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "21", "pageType": "1", "pageURL": "monthly-allocation-to-msme", "pageName": "Monthly Allocation to MSME", "pageGroup": "MIS Reports", "pageIcon": "fa-solid fa-file-contract", "sortOrder": 1, "isSidebarMenu": true },
      { "pageId": "22", "pageType": "1", "pageURL": "etp_report", "pageName": "eTP report", "pageGroup": "MIS Reports", "pageIcon": "fa-solid fa-file-contract", "sortOrder": 1, "isSidebarMenu": true },


    ]
    this.getPageList = JSON.stringify(data);

    this.sideBarMenu(data)
  }


  sideBarMenu(data: any) {
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
      let data: any = JSON.parse(this.getPageList);
      console.log(data)
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

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';

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
export class SidebarComponent implements OnInit {
  menus:any = [];

  loginPages: any = [];

  constructor(public sidebarservice: SidebarService) {
    this.menus = sidebarservice.getMenuList();
    let data  =[
      {
          "pageId": "1",
          "pageType": "1",
          "pageURL": "dashboard",
          "pageName": "Dashboard",
          "pageGroup": "Dashboard",
          "pageIcon": "assets/images/menu-icons/Dashboard.svg",
          "sortOrder": 1,
          "isSidebarMenu": true
      },
      {
          "pageId": "2",
          "pageType": "1",
          "pageURL": "ministries",
          "pageName": "Ministries",
          "pageGroup": "Masters",
          "pageIcon": "assets/images/menu-icons/Master.svg",
          "sortOrder": 2,
          "isSidebarMenu": true
      },
      {
          "pageId": "3",
          "pageType": "1",
          "pageURL": "zone-region",
          "pageName": "Zone/Region",
          "pageGroup": "Masters",
          "pageIcon": "assets/images/menu-icons/Master.svg",
          "sortOrder": 3,
          "isSidebarMenu": true
      },
      {
          "pageId": "4",
          "pageType": "1",
          "pageURL": "dist-division",
          "pageName": "District/Division",
          "pageGroup": "Masters",
          "pageIcon": "assets/images/menu-icons/Master.svg",
          "sortOrder": 4,
          "isSidebarMenu": true
      },
      {
          "pageId": "5",
          "pageType": "1",
          "pageURL": "category",
          "pageName": "Category",
          "pageGroup": "Masters",
          "pageIcon": "assets/images/menu-icons/Master.svg",
          "sortOrder": 5,
          "isSidebarMenu": true
      },
      {
          "pageId": "6",
          "pageType": "1",
          "pageURL": "expertise-area",
          "pageName": "Expertise Area",
          "pageGroup": "Masters",
          "pageIcon": "assets/images/menu-icons/Master.svg",
          "sortOrder": 6,
          "isSidebarMenu": true
      },
      {
          "pageId": "7",
          "pageType": "1",
          "pageURL": "packages",
          "pageName": "Packages",
          "pageGroup": "Masters",
          "pageIcon": "assets/images/menu-icons/Master.svg",
          "sortOrder": 7,
          "isSidebarMenu": true
      },
      {
          "pageId": "8",
          "pageType": "1",
          "pageURL": "bidders",
          "pageName": "Bidders",
          "pageGroup": "Users",
          "pageIcon": "assets/images/menu-icons/Users.svg",
          "sortOrder": 8,
          "isSidebarMenu": true
      },
      {
          "pageId": "9",
          "pageType": "1",
          "pageURL": "consultants",
          "pageName": "Consultants",
          "pageGroup": "Users",
          "pageIcon": "assets/images/menu-icons/Users.svg",
          "sortOrder": 9,
          "isSidebarMenu": true
      },
      {
          "pageId": "10",
          "pageType": "1",
          "pageURL": "cb-Team",
          "pageName": "CB/Team",
          "pageGroup": "Users",
          "pageIcon": "assets/images/menu-icons/Users.svg",
          "sortOrder": 10,
          "isSidebarMenu": true
      },
      {
          "pageId": "11",
          "pageType": "1",
          "pageURL": "permission",
          "pageName": "Permission",
          "pageGroup": "Users",
          "pageIcon": "assets/images/menu-icons/Users.svg",
          "sortOrder": 11,
          "isSidebarMenu": true
      },
      {
          "pageId": "12",
          "pageType": "1",
          "pageURL": "tenders",
          "pageName": "Tenders",
          "pageGroup": "Tender",
          "pageIcon": "assets/images/menu-icons/Tenders.svg",
          "sortOrder": 11,
          "isSidebarMenu": true
      },
      {
          "pageId": "33",
          "pageType": "1",
          "pageURL": "booklets",
          "pageName": "Booklets",
          "pageGroup": "Tender",
          "pageIcon": "assets/images/menu-icons/Tenders.svg",
          "sortOrder": 12,
          "isSidebarMenu": true
      },
      {
          "pageId": "14",
          "pageType": "1",
          "pageURL": "appointments",
          "pageName": "Appointments",
          "pageGroup": "Appointments",
          "pageIcon": "assets/images/menu-icons/Appointments.svg",
          "sortOrder": 14,
          "isSidebarMenu": true
      },
      {
          "pageId": "15",
          "pageType": "1",
          "pageURL": "payments",
          "pageName": "Payments",
          "pageGroup": "Payments",
          "pageIcon": "assets/images/menu-icons/Payments.svg",
          "sortOrder": 15,
          "isSidebarMenu": true
      },
      {
          "pageId": "16",
          "pageType": "1",
          "pageURL": "feedback",
          "pageName": "Feedback",
          "pageGroup": "Feedback",
          "pageIcon": "assets/images/menu-icons/feedback.svg",
          "sortOrder": 16,
          "isSidebarMenu": true
      },
      {
          "pageId": "17",
          "pageType": "1",
          "pageURL": "report",
          "pageName": "Reports",
          "pageGroup": "Reports",
          "pageIcon": "assets/images/menu-icons/Reports.svg",
          "sortOrder": 17,
          "isSidebarMenu": false
      },
      {
          "pageId": "35",
          "pageType": "0",
          "pageURL": "add-tenders",
          "pageName": "Add Tender",
          "pageGroup": "Other",
          "pageIcon": "assets/images/menu-icons/feedback.svg",
          "sortOrder": 35,
          "isSidebarMenu": false
      },
      {
          "pageId": "36",
          "pageType": "0",
          "pageURL": "edit-tenders/:id",
          "pageName": "Edit Tender",
          "pageGroup": "Other",
          "pageIcon": "assets/images/menu-icons/feedback.svg",
          "sortOrder": 36,
          "isSidebarMenu": false
      },
      {
          "pageId": "37",
          "pageType": "0",
          "pageURL": "booklet/:id",
          "pageName": "Booklet",
          "pageGroup": "Other",
          "pageIcon": "assets/images/menu-icons/feedback.svg",
          "sortOrder": 37,
          "isSidebarMenu": false
      },
      {
          "pageId": "38",
          "pageType": "0",
          "pageURL": "edit-booklet/:id/:id",
          "pageName": "Booklet",
          "pageGroup": "Other",
          "pageIcon": "assets/images/menu-icons/feedback.svg",
          "sortOrder": 38,
          "isSidebarMenu": false
      },
      {
          "pageId": "50",
          "pageType": "0",
          "pageURL": "question-bank-list",
          "pageName": "Question Bank List",
          "pageGroup": "Tender",
          "pageIcon": "assets/images/menu-icons/Appointments.svg",
          "sortOrder": 50,
          "isSidebarMenu": true
      },
      {
          "pageId": "51",
          "pageType": "0",
          "pageURL": "add-question",
          "pageName": "Add-Question",
          "pageGroup": "Tender",
          "pageIcon": "assets/images/menu-icons/Appointments.svg",
          "sortOrder": 51,
          "isSidebarMenu": false
      },
      {
          "pageId": "52",
          "pageType": "0",
          "pageURL": "edit-question/:id",
          "pageName": "Edit Question",
          "pageGroup": "Tender",
          "pageIcon": "assets/images/menu-icons/Appointments.svg",
          "sortOrder": 52,
          "isSidebarMenu": false
      },
      {
          "pageId": "53",
          "pageType": "0",
          "pageURL": "view-question/:id",
          "pageName": "view  Question",
          "pageGroup": "Tender",
          "pageIcon": "assets/images/menu-icons/Appointments.svg",
          "sortOrder": 53,
          "isSidebarMenu": false
      }
    ]
    this.sideBarMenu(data)
   }

  ngOnInit(): void {
  }

  
  sideBarMenu(data: any) {
    this.loginPages = [];
    let items: any = data.filter((ele: any) => {
      debugger;
      if (ele['isSideBarMenu'] == true) {
        console.log(ele);
        return ele;
      }
    })
    console.log(items);
    // items.forEach((item: any) => {
    //   let existing: any = this.loginPages.filter((v: any) => {
    //     return v.module == item.module;
    //   });
    //   if (existing.length) {
    //     let existingIndex: any = this.loginPages.indexOf(existing[0]);
    //     this.loginPages[existingIndex].pageURL = this.loginPages[existingIndex].pageURL.concat(item.pageURL);
    //     this.loginPages[existingIndex].pageName = this.loginPages[existingIndex].pageName.concat(item.pageName);
    //   } else {
    //     if (typeof item.pageName == 'string')
    //       item.pageURL = [item.pageURL];
    //     item.pageName = [item.pageName];
    //     this.loginPages.push(item);
    //   }
    // });
  
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu:any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element:any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu:any) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
  
  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }
  
}

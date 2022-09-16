import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Masters',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Organization Registration',
          url:'organization-registration'
        },
        {
          title: 'Company Registration',
          url:'company-registration'
        },
        {
          title: 'Department Registration',
          url:'department-registration'
        },
        {
          title: 'Designation Registration',
          url:'designation-registration'
        },
        {
          title: 'Holiday Master',
          url:'holiday-master'
        },
        {
          title: 'Leave Type Registration',
          url:'leave-type-registration'
        },
        {
          title: 'Salary Type Registration',
          url:'salary-type-registration'
        },
        {
          title: 'Bank Registration',
          url:'bank-registration'
        },
        {
          title: 'Bank Branch Registration',
          url:'bank-branch-registration'
        },
        {
          title: 'Company Bank Account Registration',
          url:'company-bank-registration'
        },
        {
          title: 'Document Type Registration',
          url:'document-type-registration'
        }
      ]
    },
    {
      title: 'Register',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Employee Registration',
          url:'employee-registration'
        },
        {
          title: 'Employee Salary Details',
          url:'employee-salary-details'
        },
        {
          title: 'Assign Reporting Person',
          url:'assign-reporting-person'
        },
        {
          title: 'Leave Assignment',
          url:'leave-assignment'
        }
      ]
    },
    {
      title: 'Components',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'General',
        },
        {
          title: 'Panels'
        },
        {
          title: 'Tables'
        },
        {
          title: 'Icons'
        },
        {
          title: 'Forms'
        }
      ]
    },
    {
      title: 'Charts',
      icon: 'fa fa-chart-line',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Pie chart',
        },
        {
          title: 'Line chart'
        },
        {
          title: 'Bar chart'
        },
        {
          title: 'Histogram'
        }
      ]
    },
    {
      title: 'Maps',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Google maps',
        },
        {
          title: 'Open street map'
        }
      ]
    },
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'Documentation',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendar',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: 'Examples',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}

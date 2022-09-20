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
      title: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      active: true,
      type: 'simple',
    },
    {
      title: 'Master',
      icon: 'fa-solid fa-paper-plane',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Register User',
          url:'register-user'
        },
        {
          title: 'Register Collary',
          url:'register-collary'
        },
        {
          title: 'Coal Grade master',
          url:'cola-grade-master'
        },
        {
          title: 'Document master',
          url:'document-master'
        },
        {
          title: 'Grade wse Rate card Chart',
          url:'grade-wise-rate-card-chart'
        },
        {
          title: 'Consumer Registration',
          url:'consumer-registration'
        },
      ]
    },
    {
      title: 'Application',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Application',
          url:'application'
        },
        {
          title: 'Approval',
          url:'approval'
        }
      ]
    },
    {
      title: 'Coal Allocation',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Coal Allocation',
          url:'coal-allocation'
        }
      ]
    },
    {
      title: 'Coal Lifting',
      icon: 'fa fa-chart-line',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Generate MSME Invoice/Challan',
          url:'generate-msme-invoice-challan'
        }
      ]
    },
    {
      title: 'Vehicle Management',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Register Vehicle',
          url:'register-vehicle'
        },
        {
          title: 'Vehicle Tracking',
          url:'vehicle-tracking'
        }
      ]
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

// Vendors
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.page.html',
  styleUrls: ['./admin-tabs.page.scss'],
})
export class AdminTabsPage implements OnInit {

  public pageTitle: string = 'Users';

  constructor(
  ) {
  }

  ngOnInit() {
  }

  public changePageTitle(value: string) {
    this.pageTitle = value;
  }

}

// Vendors
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.page.html',
  styleUrls: ['./auth-tabs.page.scss'],
})
export class AuthTabsPage implements OnInit {

  public pageTitle: string = 'Login';

  constructor() { }

  ngOnInit() {
  }

  public changePageTitle(value: string) {
    this.pageTitle = value;
  }

}

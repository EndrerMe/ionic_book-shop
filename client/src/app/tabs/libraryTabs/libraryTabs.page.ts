// Vendors
import { Component } from '@angular/core';
import { Events } from '@ionic/angular';

// Interfaces
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-libraryTabs',
  templateUrl: 'libraryTabs.page.html',
  styleUrls: ['libraryTabs.page.scss']
})
export class LibraryTabsPage {

  private isUser: boolean = false;
  private currentUser: IUser;
  private bagLength: number = 0;
  private showAdminBunc = true;
  private isBag: any;

  constructor(
    private events: Events
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isBag = JSON.parse(localStorage.getItem('bag'));
    if (this.isBag) {
      this.bagLength = this.isBag.length;
    }
    if (this.currentUser !== null) {
      this.isUser = true;
      if (this.currentUser.userRole === 'Администратор') {
        this.showAdminBunc = false;
      }
    }

    events.subscribe('book:inBag', (book, time) => {
      console.log(JSON.parse(localStorage.getItem('bag')).length);
      this.bagLength = JSON.parse(localStorage.getItem('bag')).length;
    });

    events.subscribe('user:signOut', (user, time) => {
      this.isUser = false;
      this.showAdminBunc = true;
    });
  }



}

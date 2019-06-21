// Vendors
import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

// Interfaces
import { IUser } from 'src/app/shared/interfaces';
// Services
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  public user: boolean = true;
  public userAdmin: boolean = false;
  private currentUser: IUser;
  public userName: string;
  public avatarUrl: string | ArrayBuffer;

  public common = [
    {
      title: 'Catalog',
      url: '/main/catalog'
    },
    {
      title: 'Shopping bag',
      url: '/shopping-bag'
    },
  ];

  public auth = {
    title: 'Authorization',
    url: '/auth/login'
  };

  public admin = [
    {
      title: 'Users',
      url: '/admin/users'
    },
    {
      title: 'Books',
      url: '/admin/books'
    },
    {
      title: 'Authors',
      url: '/admin/authors'
    },
  ];

  constructor(
    private events: Events,
    private userService: UserService,
    private router: Router,
  ) {
    events.subscribe('user:created', (user, time) => {
      this.currentUser = user;
      this.user = false;
      this.userName = user.userName;
      this.avatarUrl = user.userAvatar;
      if (user.userRole === 'Администратор') {
        this.userAdmin = true;
      }
    });
  }

  ngOnInit() {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser !== null) {
      this.user = false;
      this.userName = this.currentUser.userName;
      this.avatarUrl = this.currentUser.userAvatar;
      if (this.currentUser.userRole === 'Администратор') {
        this.userAdmin = true;
      }
    }
  }

  public signOut(): void {
    localStorage.removeItem('currentUser');
    this.events.publish('user:signOut', Date.now());
    this.currentUser = null;
    this.user = true;
    this.userName = null;
    this.userAdmin = false;
  }

  public goToUserArea() {
    this.router.navigateByUrl('user-area');
  }

}

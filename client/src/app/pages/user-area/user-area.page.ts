// Vendors
import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

// Interfaces
import { IUser } from 'src/app/shared/interfaces';
// Services
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.page.html',
  styleUrls: ['./user-area.page.scss'],
})
export class UserAreaPage implements OnInit {

  public currentUser: IUser;
  public avatarUrl: string | ArrayBuffer;

  constructor(
    private events: Events,
    private router: Router,
    private userService: UserService,
  ) {
    if (localStorage.getItem('currentUser') !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.avatarUrl = this.currentUser.userAvatar;
    }
  }

  ngOnInit() {
  }

  public signOut(): void {
    localStorage.removeItem('currentUser');
    this.events.publish('user:signOut', Date.now());
    this.router.navigate(['']);
  }

  public uploadImage(): void {
    document.getElementById('uploadFile').click();
  }

  public changeListener($event): void {
    console.log('Rsd');
    this.readThis($event.target);
  }

  public readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.avatarUrl = myReader.result;
      this.currentUser.userAvatar = this.avatarUrl;
      this.userService.chagneUserAvatar(this.currentUser).subscribe((res) => {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      },
      (err) => {
        console.log(err);
      });
    };
    myReader.readAsDataURL(file);
  }

}

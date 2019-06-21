// Vendors
import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

// Enums
import { Gender, userRole } from 'src/app/shared/enums';
// Services
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  private users: IUser[] = [] as IUser[];
  public activeUser: IUser;
  private visibility: string;
  private userForChange: IUser;
  public page: number = 1;
  public modalVisibility: boolean;
  private changeForm: FormGroup;
  public modalNewUserVisibility: boolean;
  private genderOfTheUser: string = 'Мужчина';

  private skip: number = this.users.length;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private registForm: FormGroup;
  public userGender: string[] = [Gender.male, Gender.female];
  public userRoles: string[] = [userRole.admin, userRole.commonUser];
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userEmailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.activeUser = JSON.parse(localStorage.getItem('currentUser')).id;
    this.modalVisibility = false;
    this.modalNewUserVisibility = false;
    this.addMoreData();
  }

  ngOnInit() {
    this.changeForm = this.formBuilder.group ({
      id: new FormControl(
        '', [
      ]),
      userName: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userEmail: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userEmailPattern),
      ]),
      userGender: new FormControl (
        'Мужчина', [
          Validators.required
      ]),
      userRole: new FormControl (
        '', [
          Validators.required
      ]),
      userPassword: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern)
      ])
    });

    this.registForm = this.formBuilder.group ({
      userName: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userEmail: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userEmailPattern),
      ]),
      userGender: new FormControl (
        'Мужчина', [
          Validators.required
      ]),
      userRole: new FormControl (
        '', [
          Validators.required
      ]),
      userPassword: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern)
      ])
    });
  }

  public loadData(event): void {
    setTimeout(() => {
      event.target.complete();

      this.addMoreData();
    }, 500);
  }

  private addMoreData() {
    this.userService.getUsers(this.skip).subscribe((res) => {
      if (this.users.length === 0 ) {
        this.users = res;
      } else {
        for (let i = 0; i < res.length; i++) {
          this.users.push(res[i]);
        }
      }
      this.skip = this.users.length;
    },
    (err) => {
      console.log(err);
    });
  }

  public toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  public radioGengre(event: any): void {
    this.genderOfTheUser = event.target.value;
  }

  public showUserInfo(userId: string): void {
    if (this.visibility === userId) {
      this.visibility = '';
      return;
    }
    this.visibility = userId;
  }

  public deleteUser(user: IUser): void {
    console.log(user);
    this.userService.deleteUser(user).subscribe();
    for (let i = 0; i < this.users.length; i++) {
      if (user.id === this.users[i].id) {
        this.users.splice(i, 1);
      }
    }
  }

  public modalChangeUser(user: IUser): void {
    this.userForChange = user;
    this.modalVisibility = true;
  }

  public changeUserData(repeatPass: string): void {
    if (this.changeForm.value.userPassword === repeatPass) {
      this.changeForm.value.id = this.userForChange.id;
      this.userForChange = this.changeForm.value;
      this.userForChange.userGender = this.genderOfTheUser;
      console.log(this.userForChange);
      this.userService.changeUser(this.userForChange).subscribe((res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.alertService.alert(err.error.error);
      });
      this.changeForm.reset();
      for (let i = 0; i < this.users.length; i++) {
        if (this.userForChange.id === this.users[i].id) {
          this.users[i] = this.userForChange;
        }
      }
      this.modalVisibility = false;
    } else {
      this.alertService.alert('Wrong data');
    }
  }

  public closeModal(): void {
    this.modalVisibility = false;
  }

  public modalNewUser(): void {
    this.modalNewUserVisibility = true;
  }

  public addNewUser(repeatPassword: string): void {
    if (this.registForm.value.userPassword === repeatPassword) {
      this.registForm.value.userGender = this.genderOfTheUser;
      this.authService.registUser(this.registForm.value).subscribe((res) => {
        this.users.push(res);      },
      (err) => {
        console.log(err);
        this.alertService.alert(err.error.error);
      });
      this.modalNewUserVisibility = false;
      this.registForm.reset();
    } else {
      this.alertService.alert('Wrong password');
    }
  }

  public closeModalNewUser(): void {
    this.modalNewUserVisibility = false;
  }

}

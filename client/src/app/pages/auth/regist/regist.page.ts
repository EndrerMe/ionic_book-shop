// Vendors
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Enums
import { Gender, userRole } from 'src/app/shared/enums';
// Services
import { AuthService, AlertService } from 'src/app/shared/services';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {

  private registForm: FormGroup;
  private genderOfUser: string = 'Мужчина';
  public userGender: string[] = [Gender.male, Gender.female];
  public userRoles: string[] = [userRole.admin, userRole.commonUser];
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
  private userEmailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
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
        ]
      )
    });
  }

  public radioGengre(event: any): void {
    this.genderOfUser = event.target.value;
  }

  public async addNewUser(repeatPass: string) {
    if (this.registForm.value.userPassword === repeatPass) {
      this.registForm.value.userGender = this.genderOfUser;
      this.authService.registUser(this.registForm.value).subscribe((res) => {
          this.router.navigate(['main/auth']);
      },
      (err) => {
        console.log(err);
        this.alertService.alert(err.error.error);
      });
    }
  }

}

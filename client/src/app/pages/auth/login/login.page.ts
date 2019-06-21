// Vendors
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

// Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  private userNamePattern: RegExp = /^[A-Za-z0-9_]{1,15}$/;
  private userPassPattern: RegExp = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private events: Events
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl (
        '', [
          Validators.required,
          Validators.pattern(this.userNamePattern)
      ]),
      userPassword: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(this.userPassPattern),
        ]),
    });
  }

  public async login() {
    this.authService.getUserForLogin(this.loginForm.value).subscribe((res) => {
      const decode = jwt_decode(res.token);
      delete decode.exp;
      delete decode.iat;
      localStorage.setItem('currentUser', JSON.stringify(decode));
      this.events.publish('user:created', decode, Date.now());
      this.router.navigate(['']);
    },
    async (err) => {
      console.log(err.error.error);
      this.alertService.alert(err.error.error);
    });
  }

}

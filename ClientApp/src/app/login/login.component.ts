import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { InternalUserService } from '../../services/internalUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  errorMessage: string;
  token: string;
  invalidLogin: boolean;
  response: any;

  constructor(private sharedService: SharedService, private router: Router,
              private dataService: InternalUserService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.sharedService.currentToken.subscribe(token => this.token = token);
  }

  login(form: NgForm) {
    this.spinner.show();
    this.dataService.login(form.value.username, form.value.password).subscribe(
      response => { this.response = response; },
      error => {
        this.spinner.hide();
        this.invalidLogin = true;
        this.errorMessage = 'E-mail ó contraseña inválido';
      },
      () => {
        this.saveTokenAndUser();
      }
    );
  }

  saveTokenAndUser() {
    this.sharedService.clearLocalStorage();
    this.sharedService.setToken(this.response.token);
    this.sharedService.setUser(this.response.internalUser);
    this.invalidLogin = false;
    // this.router.navigate(['/url_ppal']); url_ppal = redireccionamiento a la vista principal, en este caso cupos
    this.router.navigate(['/cupos']);
  }

}

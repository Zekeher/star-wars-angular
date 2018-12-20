import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menssage } from '../models/menssage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public login: Boolean = false;
  public menssage = new Menssage('', false);
  // Get formLogin Controls
  get f() {
    return this.formLogin.controls;
  }

  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {}

  showLogin() {
    this.login = !this.login;
  }

  // Esta funcion valida si el usuario es valido para loguearse
  loginUser(form) {
    this.menssage = new Menssage('', false);
    console.log(form);
    if (form.name && form.pass) {
      this.loginService.login(form).subscribe((data: Login) => {
        if (data.status) {
          this.router.navigate(['/home']);
        } else {
          this.menssage = new Menssage(data.msg, true);
        }
      }, (error) => {
        error = error.error;
        if (error.msg) {
          this.menssage = new Menssage(error.msg, true);
        } else {
          this.menssage = new Menssage('No hay conexion', true);
        }
      });
    } else {
      this.menssage = new Menssage('Ingrese el Usuario o contraseña faltante', true);
    }
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      name: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
const url: String = 'http://localhost:3977/api';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {}

  // esta funcion del servicio es para logearse
  login(user): Observable<Login> {
    return this._http.post<Login>(`${url}/login`, user);
  }
}

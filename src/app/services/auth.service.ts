import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = `${environment.api_url}/api/Clients`;
  private readonly headers: HttpHeaders;
  private readonly sessionName = 'roomsAngularToken';

  constructor(
    private http: HttpClient
  ) 
  { 
    this.headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });
  }

  isLoggedIn(){
    return localStorage.getItem(this.sessionName) ? true : false;
  }

  setSession(value: any) {
    localStorage.setItem(this.sessionName, JSON.stringify(value));
  }

  getSession(key: string): any {
    return localStorage.getItem(key);
  }

  clearSession(): any {
    localStorage.clear();
  }

  getAccessToken() {
    if ( this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem(this.sessionName)).id;
    }
  }

  getClientId() {
    if ( this.isLoggedIn()) {
      return JSON.parse(localStorage.getItem(this.sessionName)).userId;
    }
  }

  login(data){
    console.log(data);
    return this.http.post(`${this.url}/login`, data, {headers: this.headers});
  }

  logout(){
    const accessToken = this.getAccessToken();
    return this.http.post(`${this.url}/logout?access_token=${accessToken}`, {headers: this.headers});
  }

  signup(data){
    console.log(data);
    return this.http.post(`${this.url}`, data, {headers: this.headers});
  }
  
  getClient() {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : `${this.getAccessToken()}`
    });

    var clientId = this.getClientId();
    return this.http.get(`${this.url}/${clientId}`, {headers: headers});
  }

  getClientRooms() {
    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization' : `${this.getAccessToken()}`
    });

    var clientId = this.getClientId();
    if (clientId !== undefined) {
      return this.http.get(`${this.url}/${clientId}/rooms`, {headers: headers});
    }
  }
}


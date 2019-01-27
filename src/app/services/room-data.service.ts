import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Room, PostRoom } from '../common/room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private readonly headers: HttpHeaders;
  private readonly url = `${environment.api_url}/api/Rooms`;
  private accessToken;

  constructor (
    private http: HttpClient,
    private authService: AuthService
  ) 
  {
    this.accessToken = this.authService.getAccessToken();

    this.headers = new HttpHeaders ({
      'Content-type': 'application/json',
      'Authorization' : `${this.accessToken}`
    });
  }

  getData(url: string) {
    return this.http.get(url);
  }


  getRoomById(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }

  getRoomsWithCategories() {
    return this.http.get(`${this.url}/?filter[include]=category`);
  }

  createRoom(data: PostRoom) {
    //return this.http.post(`${this.url}/?access_token=${this.accessToken}`, data, {headers: this.headers});
    return this.http.post(`${this.url}?access_token=${this.accessToken}`, data, {headers: this.headers});
  }

  updateRoom(id: string, data: Room) {
    return this.http.put(`${this.url}/${id}?access_token=${this.accessToken}`, data);
  }

  deleteRoomWithId(id: string) {
    return this.http.delete(`${this.url}/${id}?access_token=${this.accessToken}`);
  }

  postData(url: string, data){
    console.log(url, data);

    const headers = new HttpHeaders({
      'Content-type' : 'application/json'
    });
    return this.http.post(url, data, {headers: headers});
  }
}

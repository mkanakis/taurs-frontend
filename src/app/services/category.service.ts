import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private headers: HttpHeaders;
  private url = `${environment.api_url}/api/Categories`;

  constructor(
    private http: HttpClient
  ) 
  { 
    this.headers = new HttpHeaders ({
      'Content-type' : 'application/json'
    });
  }

  getCategories() {
    return this.http.get(this.url);
  }

  getCategoryById(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  postCategory(category: any) {
    return this.http.post(`${this.url}`, category, {headers: this.headers});
  }

  delCategory(id: string) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers});
  }
}

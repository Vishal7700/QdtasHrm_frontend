import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API_URL } from '../constansts';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getHeadersWithoutToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return headers;
  }



  login(data: any) {
    return this.http.post(BASE_API_URL + `/user/login`, data, { headers: this.getHeadersWithoutToken() });
  }


  profile() {
    const user = localStorage.getItem('user');
    console.log(user);
  }

  addUser(user: any) {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(BASE_API_URL + `/user/add`, user, { headers: this.getHeaders() });
  }

  deleteUser(userId: number) {
    let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    this.http.delete(`http://localhost:4200/deleteUser/${userId}`, { headers })
      .subscribe((result: any) => {
      })
  }

  editUser(userId: number, updatedUser: any) {
    let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    this.http.put(`http://localhost:4200/editUser/${userId}`, updatedUser, { headers })
      .subscribe((result: any) => {
      })
  }

}


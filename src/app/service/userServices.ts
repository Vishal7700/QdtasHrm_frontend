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

  getHeaders() {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    return headers;
  }


  login(data: any) {
    return this.http.post(BASE_API_URL + `/user/login`, data, { headers: this.getHeaders() });
  }


  // profile(): Observable<any> {
  //   return this.http.post(BASE_API_URL + `/user/profile`, {}, { headers: this.getHeaders() });
  // }

  
   profile() {
    let headers = new HttpHeaders()
    .set("Authorization", `bearer ${localStorage.getItem('token')}`);
     this.http.post("http://localhost:4200/userLogin",{},{headers}).subscribe((result:any)=>{})
  }

  addUser(user: any) {
    let headers = new HttpHeaders().set("Authorization", `bearer ${localStorage.getItem('token')}`);
    this.http.post("http://localhost:4200/userLogin", {}, { headers }).subscribe((result: any) => {
    },);
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


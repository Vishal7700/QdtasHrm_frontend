import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API_URL } from '../constansts';
import { Observable } from 'rxjs';
import { User } from '../model/user';




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
      'Access-Control-Allow-Origin': '*'
    });
    return headers;
  }

  // <----  Authemtication Services

  login(data: any) {
    return this.http.post(BASE_API_URL + `/user/login`, data, { headers: this.getHeadersWithoutToken() });
  }

  clearc() {
    localStorage.clear();
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token == null || token.length <= 0) {
      return false;
    } else {
      return true;
    }
  }

  //  Authemtication Services ---->

  resetPassword(email: string) {
    return this.http.post<any>(BASE_API_URL + `/user/resetPassword?email=` + email, { headers: this.getHeadersWithoutToken() });
  }

  changeTempPass(cp: any) {
    return this.http.post<any>(BASE_API_URL + `/user/changeTempPassword`, cp, { headers: this.getHeadersWithoutToken() });
  }

  updateUser(uId: number, user: any) {
    return this.http.post<any>(BASE_API_URL + `/user/updateUser/` + uId, user, { headers: this.getHeaders() });
  }

  profile() {
    const user = localStorage.getItem('user');
  }

  addUser(user: any) {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(BASE_API_URL + `/user/add`, user, { headers: this.getHeaders() });
  }

  applyLeave(user: any) {
    let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(BASE_API_URL + `/leave/create`, user, { headers: this.getHeaders() });
  }

  getAllUsers(currentPage: number, resultSize: number) {
    return this.http.get<User[]>(BASE_API_URL + `/user/getAll?pgn=` + currentPage + `&sz=` + resultSize, { headers: this.getHeaders() });
  }

  getUserById(uId: number) {
    return this.http.get<any>(BASE_API_URL + `/user/` + uId, { headers: this.getHeaders() });
  }

  //   applyLeave(user: any) {
  //   let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.post<any>(BASE_API_URL + `/user/leave`, user, { headers: this.getHeaders() });
  // }



  deleteUser(userId: number) {
    return this.http.post<String>(BASE_API_URL + `/user/deleteUser?uId=` + userId, userId, { headers: this.getHeaders() });

  }

  // editUser(userId: number, updatedUser: any) {
  //   let headers = new HttpHeaders().set("Authorization", `bearer ${ localStorage.getItem('token') }`);
  //   this.http.put(`http://localhost:4200/editUser/${userId}`, updatedUser, { headers })
  //     .subscribe((result: any) => {
  //     })
  // }

}


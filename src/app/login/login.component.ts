import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {
  }

  isLoading: boolean = false;

  userLogin(data: any) {
    this.isLoading = true;
    this.userService.login(data).subscribe(
      (response: any) => {
        localStorage.setItem("token", response.token);
        this.router.navigate(['/profile']);
        this.isLoading = false;
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status == 401) {
          alert("Invalid email or password. Please try again.");
        }
        else if (error.status == 400) {
          alert("Something went wrong with your request. Please try again later.");
        }
        else {
          alert("An unexpected error occurred. Please try again later.");
        }
      }
    )
  }
}

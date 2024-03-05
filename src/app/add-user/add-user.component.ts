import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/userServices';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {

  users: User[] = [];
  resultPage: number = 1;
  resultSize: number = 10;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  sideNavStatus: boolean = false;
  private subscriptions: Subscription[] = [];



  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.loadUsers(this.resultPage);
  }

  saveUser(userData: any) {
    this.users.push(userData);
    this.userService.addUser(userData).subscribe(
      (response: any) => {
        console.log(response);
        this.openSnackBar(`User added successfully: ${JSON.stringify(response)}`);
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        if (error.status == 400) {
          this.openSnackBar(error.error.message);
        } else {
          this.openSnackBar("An unexpected error occurred. Please try again later.");
          console.log(error.status, error.message);
        }
      }
    );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 60000,
      verticalPosition: 'top'
      // 1 minute in milliseconds
    });
  }


  deleteUser(uId: number): void {
    const snackBarRef = this.snackBar.open('Are you sure you want to delete?', 'Yes', {
      duration: 0,
      verticalPosition: 'top'
    });

    snackBarRef.onAction().subscribe(() => {
      this.userService.deleteUser(uId).subscribe(
        (response: any) => {
          this.openSnackBar(response.message);
          window.location.reload();
        },
        (error: any) => {
          console.log(error.error.message);
        }
      );
    });
  }

  loadUsers(currentPage: number): void {
    this.subscriptions.push(
      this.userService.getAllUsers(currentPage, this.resultSize).subscribe(
        (us: User[]) => {
          us.forEach(usr => this.users.push(usr));
          if (this.users.length <= 0 && this.resultPage === 1)
            if (this.users.length <= 0) this.hasMoreResult = false;
          this.fetchingResult = false;
          this.resultPage++;
        }, (error) => {
          console.log(error.error.message);
        }
      )
    );
  }

  loadMoreUsers(): void {
    this.loadUsers(this.resultPage);
  }


}






// import { Component } from '@angular/core';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent {
//   users: any[] = []; // Assuming you have an array to store user data
//   showForm: boolean = false;
//   editMode: boolean = false;
//   editedUserIndex: number = -1;
//   editedUserData: any = {};

//   saveUser(userData: any) {
//     if (this.editMode) {
//       this.users[this.editedUserIndex] = { ...userData };
//       this.editMode = false;
//       this.editedUserIndex = -1;
//     } else {
//       this.users.push(userData);
//     }
//     this.showForm = false;
//     this.clearFormData();
//   }

//   editUser(user: any) {
//     this.showForm = true;
//     this.editMode = true;
//     this.editedUserData = { ...user };
//     this.editedUserIndex = this.users.indexOf(user);
//   }

//   deleteUser(index: number) {
//     this.users.splice(index, 1);
//   }

//    clearFormData() {
//     this.editedUserData = {};
//   }
// }

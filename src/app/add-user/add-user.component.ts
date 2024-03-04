import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent {


  constructor(private userService: UserService, private router: Router) {
  }

  users: any[] = []; // Array to hold user data

  saveUser(userData: any) {
    
     this.users.push(userData); // Add submitted data to the users array
  
    console.log(userData);
    this.userService.addUser(userData).subscribe(
      (response: any) => {
        console.log(response)
        alert("User added successfully.");
        window.location.reload();
      }, (error: HttpErrorResponse) => {
        if (error.status == 400) {
          alert(error.error.message);
        }
        else {
          alert("An unexpected error occurred. Please try again later.");
          console.log(error.status, error.message)
        }
      }
    )

    
  }


  deleteUser(index: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.users.splice(index, 1); // Remove user from array
    }
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

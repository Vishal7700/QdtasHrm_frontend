import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  users: any[] = []; // Assuming you have an array to store user data
  showForm: boolean = false;
  editMode: boolean = false;
  editedUserIndex: number = -1;
  editedUserData: any = {};

  saveUser(userData: any) {
    if (this.editMode) {
      this.users[this.editedUserIndex] = { ...userData };
      this.editMode = false;
      this.editedUserIndex = -1;
    } else {
      this.users.push(userData);
    }
    this.showForm = false;
    this.clearFormData();
  }

  editUser(user: any) {
    this.showForm = true;
    this.editMode = true;
    this.editedUserData = { ...user };
    this.editedUserIndex = this.users.indexOf(user);
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

   clearFormData() {
    this.editedUserData = {};
  }
}

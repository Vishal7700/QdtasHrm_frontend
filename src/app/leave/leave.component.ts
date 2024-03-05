import { Component } from '@angular/core';
import { UserService } from '../service/userServices';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {

  sideNavStatus: boolean = false;


  constructor(private UserService:UserService){

  }
  ngOnInit() {
    this.UserService.profile();
    }

 isSidebarExpanded: boolean = true;


  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
  users: any[] = []; // Array to hold user data

  applyLeave(userData: any) {
    this.users.push(userData); // Add submitted user data to the array
    // Clear the form fields after submission
    userData = {};
  }

    deleteUser(index: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.users.splice(index, 1); // Remove user from array
    }
  }


}

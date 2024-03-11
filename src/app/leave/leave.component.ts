import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { User } from '../model/user';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {

  sideNavStatus: boolean = false;
  u: User = this.UserService.getAuthUserFromCache();
  empId: number = this.u.userId as number;


  constructor(private UserService: UserService) {

  }
  ngOnInit() {
    this.UserService.profile();
  }


  isSidebarExpanded: boolean = true;


  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
  users: any[] = [];

  applyLeave(userData: any) {
    console.log(userData);
    // this.UserService.applyLeave(userData).subscribe(
    //   (res: any) => {
    //     console.log(res);

    //   }, (error: any) => {
    //     console.log(error);
    //   }
    // );

    userData = {};
  }

  deleteUser(index: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.users.splice(index, 1); // Remove user from array
    }
  };
}

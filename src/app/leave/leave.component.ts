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

}

import { Component } from '@angular/core';
import { UserService } from '../service/userServices';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent {

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

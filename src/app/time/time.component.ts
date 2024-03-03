import { Component } from '@angular/core';
import { UserService } from '../service/userServices';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {

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

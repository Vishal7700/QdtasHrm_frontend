import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { User } from '../model/user';

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
 u: User = this.UserService.getAuthUserFromCache();

  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }



saveTimesheet(data: any) {
console.log(data);
}

 
}

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
  date!: string;

  constructor(private UserService:UserService){
     this.setTodayDate();
  }

 
  ngOnInit() {
    this.UserService.profile();
    }

 isSidebarExpanded: boolean = true;
 u: User = this.UserService.getAuthUserFromCache();

  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  setTodayDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    this.date = `${day}-${month}-${year}`;

}

saveTimesheet(data: any) {
console.log(data);
}

 
}

import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { User } from '../model/user';
import { OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {

  sideNavStatus: boolean = false;
  minDate = "";
  maxDate = "";
 @ViewChild('endDate') endDateInput: any; // This allows accessing the input element in the template
 endDate: string ='';
  constructor(private UserService:UserService){
    
  }

 
  ngOnInit() {
    this.UserService.profile();

    const today = new Date();
const year = today.getFullYear();
const month = ('0' + (today.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
const day = ('0' + today.getDate()).slice(-2);
this.endDate = `${year}-${month}-${day}`;

// Set maxDate to today's date
this.maxDate = this.endDate;

// Calculate the date 7 days ago
const sevenDaysAgo = new Date(today);
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// Format the date 7 days ago
const minYear = sevenDaysAgo.getFullYear();
const minMonth = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
const minDay = ('0' + sevenDaysAgo.getDate()).slice(-2);

// Set minDate to 7 days ago
this.minDate = `${minYear}-${minMonth}-${minDay}`;


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

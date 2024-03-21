import { Component } from '@angular/core';
import { UserService } from '../service/userServices';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent {

  sideNavStatus: boolean = true;

  employee: any = {
    firstName: 'Admin',
    middleName:'Admin',
    lastName:'Admin',
    userId: '123',
    email: 'mailtosid79@gmail.com',
    phone: '1234567890',
    gender: 'male',
    department: 'DEV',
    role: 'Frontend DEV',
    nationality: 'Indian',
    maritalStatus: 'Single',
    dateOfBirth: '1999-03-03',
    address:'At Post Pune'

};
isFormSubmitted: boolean = false; 
constructor(private UserService:UserService){}


    saveEmployee() {
          this.isFormSubmitted = true;
   }
  
  ngOnInit() {
    this.UserService.profile();
    }

 isSidebarExpanded: boolean = true;


  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

 
}

import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/userServices';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {



isSidebarExpanded: boolean = true;
users: User[] = [];
u! : User;
resultSize = 1000;
selectedTeams = [];
selectedManagers = [];
private subscriptions: Subscription[] = [];
fullName: any[] = [];


constructor(private UserService:UserService,){

}



  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  ngOnInit() {
    const currentPage = 1; 
    this.loadUsers(currentPage);
  }

    dropdownSettings = {
    singleSelection: false,
    idField: 'id',  
    textField: 'firstName' ,  
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  dropdownSettingsForManagers = {
    singleSelection: false,
    idField: 'id',  
    textField: 'firstName', 
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

 loadUsers(selectedPage: number): void {
    this.loadUsernames(selectedPage);
  }

  loadUsernames(selectedPage: number): void {
    this.subscriptions.push(
      this.UserService.getAllUsers(selectedPage, this.resultSize).subscribe(
        (users: User[]) => {
          this.users = users;
          this.fullName = this.users
          .map(user => user.firstName + ' ' + user.lastName) 
          .filter(name => !!name); 
        },
        (error) => {
          console.log(error.error.message);
        }
      )
    );
  }


}





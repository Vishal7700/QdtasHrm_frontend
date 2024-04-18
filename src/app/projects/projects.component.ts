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

private subscriptions: Subscription[] = [];


constructor(private UserService:UserService,){
         
   
}



  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  ngOnInit() {
    const currentPage = 1; 
    this.loadUsers(currentPage);
  }

 loadUsers(selectedPage: number): void {
    this.loadUsernames(selectedPage);
  }

  loadUsernames(selectedPage: number): void {
    this.subscriptions.push(
      this.UserService.getAllUsers(selectedPage, this.resultSize).subscribe(
        (users: User[]) => {
          this.users = users;
        },
        (error) => {
          console.log(error.error.message);
        }
      )
    );
  }

}





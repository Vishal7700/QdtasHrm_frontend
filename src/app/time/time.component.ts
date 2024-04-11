import { Component, Query } from '@angular/core';
import { UserService } from '../service/userServices';
import { User } from '../model/user';
import { OnInit, ViewChild } from '@angular/core';
import { Subscription, Observable  } from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Time } from '../model/time';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent  implements OnInit{

  users: User[] = [];
  resultPage: number = 1;
  resultSize: number = 10;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  private subscriptions: Subscription[] = [];

 isLoading: boolean = false; 
 searchTerm: string = '';
  sideNavStatus: boolean = false;
  minDate : Date;
  startDate!: Date;
  isSidebarExpanded: boolean = true;
 u!: User;
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'deptId','designation','view',];
  dataSource: MatTableDataSource<User>;
 empId: number = this.UserService.getAuthUserId();
   successMessage: string | null = null;
  errorMessage: string | null = null;
  isLoggedIn! : User ;

 @ViewChild('endDate') endDateInput: any; // This allows accessing the input element in the template
 endDate: string ='';
  constructor(private UserService:UserService,
    private router: Router,
    private route: ActivatedRoute,
     ){
      const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    this.minDate = currentDate ;
    this.dataSource = new MatTableDataSource();

      }




 
  ngOnInit() {
    this.isLoading = true;
     this.UserService.getUserById(this.UserService.getAuthUserId()).subscribe(user => {
      this.u = user;
      this.isLoading = false;
    });
    // this.u=this.UserService.getAuthUserFromCache();
    this.UserService.profile();
    this.loadUsers(this.resultPage);
    }



  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }


// saveTimesheet(data: any) {
// console.log(data);
// }

applyTimeSheet(userData: any) {
  console.log(userData)
    this.UserService.addTimeSheet(userData).subscribe(
      (response: any) => {
        this.successMessage = 'Timesheet updated Successfully'; 
	 setTimeout(() => {
        this.successMessage = null;
        window.location.reload();
      }, 3000);
        
      },
      (error: any) => {
        if (error.status == 400) {
          this.errorMessage = 'An error occurred while adding the user'; 
	 setTimeout(() => {
        this.successMessage = null;
      }, 3000);

        } else {
          console.log('added');
          this.errorMessage = 'An error occurred while adding the user'; 
	 setTimeout(() => {
        this.successMessage = null;
      }, 3000);

        }
      }
    );
  }

  loadUsers(currentPage: number): void {
    this.subscriptions.push(
      this.UserService.getAllUsers(currentPage, this.resultSize).subscribe(
        (us: User[]) => {
          this.users.push(...us);
          this.dataSource.data =this.users;
          if (this.users.length <= 0 && this.resultPage === 1)
            if (this.users.length <= 0) this.hasMoreResult = false;
          this.fetchingResult = false;
          this.resultPage++;
        }, (error) => {
          console.log(error.error.message);
        }
      )
    );
  }

  loadMoreUsers(): void {
    this.isLoading = true;
    this.loadUsers(this.resultPage);
    setTimeout(() => {
       this.isLoading = false;
    }, 1000);
  }


  

  navigateToTs(data : Number) {
    this.router.navigate(['/timesheet', { eId: JSON.stringify(data) }],{ relativeTo: this.route, queryParams: {'eId':{data}} });
  };


 
    FilterChange(data : Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

    dismissSuccessMessage() {
    this.successMessage = null;
}

dismissErrorMessage() {
   this.errorMessage = null;
}
 
}

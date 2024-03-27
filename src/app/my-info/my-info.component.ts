import { Component , } from '@angular/core';
import { UserService } from '../service/userServices';
import { User } from '../model/user';
import { EditUserComponent } from '../edit-user/edit-user.component';
import {  MatDialog  } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent   {

  sideNavStatus: boolean = true;
 
    successMessage: string | null = null;
  errorMessage: string | null = null;
  



isFormSubmitted: boolean = false; 
constructor(private UserService:UserService, public dialog: MatDialog,private http: HttpClient ){
}

u! : User;

  


isMale() : string{
  if(this.u.gender?.toLowerCase() == 'male'){
    return './assets/images/male.png';
  }else{
    return './assets/images/female.png';
  }
}


    saveEmployee() {
          this.isFormSubmitted = true;
   }
  
  ngOnInit() {
    this.UserService.profile();
     this.UserService.getUserById(this.UserService.getAuthUserId()).subscribe(user => {
      this.u = user;
      console.log(this.u.userName)
    });
    }

 isSidebarExpanded: boolean = true;


  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }


 openEidtUser(uId: number): void {
    const dialogRef = this.dialog.open(EditUserComponent,  {
      width: '700px',
      data: uId,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
     this.successMessage = 'Updated Successfully'; 
     window.location.reload();
          
      } else if (result == 'failure') {
        this.errorMessage = 'Could not update';
      }
    });
  }






  
    dismissSuccessMessage() {
    this.successMessage = null;
}

dismissErrorMessage() {
   this.errorMessage = null;
}
 
}

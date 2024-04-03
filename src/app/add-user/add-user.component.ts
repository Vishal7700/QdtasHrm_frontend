import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/userServices';
import { Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Subscription, Observable  } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FormsModule, NgForm } from '@angular/forms';




@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {

  users: User[] = [];
  resultPage: number = 1;
  resultSize: number = 10;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  sideNavStatus: boolean = false;
  private subscriptions: Subscription[] = [];

  successMessage: string | null = null;
errorMessage: string | null = null;

searchTerm: string = '';
isLoggedIn! : User ;


  constructor(private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
   
  ) {

  }


  isLoading: boolean = false; 


  ngOnInit(): void {
    this.loadUsers(this.resultPage);
   this.isLoggedIn = this.userService.getAuthUserFromCache()

  }

   saveUser(userData: any) {
    this.userService.addUser(userData).subscribe(
      (response: any) => {
       
        this.successMessage = 'User added Successfully'; 
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
          this.errorMessage = 'An error occurred while adding the user'; 
	 setTimeout(() => {
        this.successMessage = null;
      }, 3000);

        }
      }
    );
  }


  deleteUser(uId: number): void {
    this.openConfirmationDialog(uId);
  }

  loadUsers(currentPage: number): void {
    this.subscriptions.push(
      this.userService.getAllUsers(currentPage, this.resultSize).subscribe(
        (us: User[]) => {
          this.users.push(...us);
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



  //  loadMoreleaves(): void {
  //   this.isLoading = true;
  //   this.loadLeaves(this.resultPage);
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1000);
  // }


  openConfirmationDialog(uId: number): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '300px',

      data: { title: 'Confirmation', message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(uId).subscribe(
          (response: any) => {
            this.successMessage = 'User deleted Successfully'; 
	 setTimeout(() => {
        this.errorMessage = null;
        window.location.reload();
      }, 3000);

            
          },
          (error: any) => {
            this.errorMessage = 'Could not delete user'; 
	 setTimeout(() => {
        this.errorMessage = null;
      }, 3000);

          }
        );
      }
    });
  }


  
  dismissSuccessMessage() {
    this.successMessage = null;
}

dismissErrorMessage() {
   this.errorMessage = null;
}

 openEidtUser(uId: number): void {
    const dialogRef = this.dialog.open(EditUserComponent,  {
      width: '700px',
      data: uId,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
     this.successMessage = 'User updated Successfully'; 
     setTimeout(() => {
           window.location.reload();
     }, 1500);
     
      } else if (result == 'failure') {
        this.errorMessage = 'Could not update user';
      }
    });
  }

  // 
preventManualInput(event: KeyboardEvent) {
    event.preventDefault();
}


 isFormEmpty(form: NgForm): boolean {
    // Check if the form is invalid or pristine (not touched)
    return !form.valid || Object.keys(form.controls).some(control => form.controls[control].value === '');
  }

}





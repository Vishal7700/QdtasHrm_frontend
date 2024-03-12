import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from '../model/user';
import { Leave } from '../model/leave';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {
  constructor(private UserService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  sideNavStatus: boolean = false;
  u: User = this.UserService.getAuthUserFromCache();
  empId: number = this.UserService.getAuthUserId();
  leaves: Leave[] = [];
  resultPage: number = 1;
  resultSize: number = 10;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  private subscriptions: Subscription[] = [];

   successMessage: string | null = null;
errorMessage: string | null = null;



  ngOnInit() {
    this.UserService.profile();
    this.empId = this.UserService.getAuthUserId();
    this.loadLeaves(this.resultPage);
  }

  isSidebarExpanded: boolean = true;


  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  applyLeave(userData: any) {
    this.UserService.applyLeave(userData, this.empId).subscribe(
      (response: any) => {
        this.successMessage = 'Leave Applied Successfully';
      setTimeout(() => {
        this.successMessage = null;
	window.location.reload();
      }, 3000);
        
      },
      (error: any) => {
        this.errorMessage = 'Something went wrong';
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      }
    );
  }

  loadLeaves(currentPage: number) {
    this.subscriptions.push(
      this.UserService.getAllLeaves(currentPage, this.resultSize).subscribe(
        (l: Leave[]) => {
          this.leaves.push(...l);
          if (this.leaves.length <= 0 && this.resultPage === 1)
            if (this.leaves.length <= 0) this.hasMoreResult = false;
          this.fetchingResult = false;
          this.resultPage++;
        }, (error) => {
          console.log(error.error.message);
        }
      )
    );
  }
  loadMoreleaves(): void {
    this.loadLeaves(this.resultPage);
  }

  deleteUser(id: number): void {
    this.openConfirmationDialog(id);
  }


  openConfirmationDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '300px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.UserService.deleteLeave(index).subscribe(
          (response: any) => {
           this.successMessage = 'Leave deleted Successfully';
      setTimeout(() => {
        this.successMessage = null;
	window.location.reload();
      }, 3000);
            
          },
          (error: any) => {
            this.errorMessage = 'Something went wrong';
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

}

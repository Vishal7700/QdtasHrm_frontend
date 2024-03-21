import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { User } from '../model/user';
import { Leave } from '../model/leave';
import { Subscription } from 'rxjs';
import { OnInit, ViewChild } from '@angular/core';


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

minDate = "";
maxDate = "";
startDateValue: string = '';
 @ViewChild('endDate') endDateInput: any; // This allows accessing the input element in the template
 endDate: string ='';

  ngOnInit() {
    this.UserService.profile();
    this.empId = this.UserService.getAuthUserId();
    this.loadLeaves(this.resultPage);

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



  //relect leave <----
  deleteUser(id: number): void {
    this.openConfirmationDialog(id);
  }


  openConfirmationDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '300px',
      data: { title: 'Confirmation', message: 'Are you sure you want to reject this leave?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.UserService.changeLeaveStatus(index).subscribe(
          (response: any) => {
           this.successMessage = 'Leave Rejected';
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

  //------->


  //Approve Leave <-----------
   approveLeave(id: number): void {
    this.openConfirmDialog(id);
  }


  openConfirmDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '300px',
      data: { title: 'Confirmation', message: 'Are you sure you want to Approve this leave?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.UserService.changeLeaveStatusApprove(index).subscribe(
          (response: any) => {
           this.successMessage = 'Leave Accepted';
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


  //-------






  dismissSuccessMessage() {
    this.successMessage = null;
}

dismissErrorMessage() {
   this.errorMessage = null;
}

preventManualInput(event: KeyboardEvent) {
    event.preventDefault();
}


getStatusColor(status: string): string {
  switch (status) {
    case 'REJECTED':
      return '#EE4B2B';
    case 'APPROVED':
      return '#32CD32';
    case 'PENDING':
      return '#fffee0';
    default:
      return 'black'; // or any default color
  }
}






}

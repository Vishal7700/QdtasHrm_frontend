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
        this.snackBar.open('Leave Applied Successfully', 'OK', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        window.location.reload();
      },
      (error: any) => {
        this.snackBar.open('Something went wrong', 'OK', {
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
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
            this.snackBar.open('Leave deleted Successfully', 'OK', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
            window.location.reload();
          },
          (error: any) => {
            this.snackBar.open('Something Went wrong.', 'OK', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            })
          }
        );

      }
    });
  }

}

import { Component } from '@angular/core';
import { UserService } from '../service/userServices';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {

  sideNavStatus: boolean = false;


  constructor(private UserService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {

  }
  ngOnInit() {
    this.UserService.profile();
  }

  isSidebarExpanded: boolean = true;


  onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }
  users: any[] = [];

  applyLeave(userData: any) {
    console.log(this.empId);
    // this.UserService.applyLeave(userData).subscribe(
    //   (res: any) => {
    //     console.log(res);

    //   }, (error: any) => {
    //     console.log(error);
    //   }
    // );

    userData = {};
  }

  deleteUser(index: number): void {
    this.openConfirmationDialog(index);
  }


  openConfirmationDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '300px',
      data: { title: 'Confirmation', message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const response = this.deleteUser(index);
        this.users.splice(index, 1);
        this.snackBar.open('User deleted Successfully', 'OK', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      }
    });
  }



}

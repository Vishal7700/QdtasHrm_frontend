import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/userServices';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { MatDialogModule } from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';



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



  constructor(private userService: UserService,
     private router: Router,
     public dialog: MatDialog,
     ) {

  }

  ngOnInit(): void {
    this.loadUsers(this.resultPage);
  }

  saveUser(userData: any) {
    this.userService.addUser(userData).subscribe(
      (response: any) => {
        console.log(response);
        alert(`User added successfully`);
        window.location.reload();
      },
      (error: any) => {
        if (error.status == 400) {
          alert(error.error.message);
        } else {
          alert(error.error.message);
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
    this.loadUsers(this.resultPage);
  }


openConfirmationDialog(uId: number): void {
  const dialogRef = this.dialog.open(DialogboxComponent, {
    width: '300px',
    position: { top: '10px' },
    data: { title: 'Confirmation', message: 'Are you sure you want to delete?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.userService.deleteUser(uId).subscribe(
        (response: any) => {
         // alert(response.message);
          window.location.reload();
        },
        (error: any) => {
          alert(error.error.message);
        }
      );
    }
  });
}

  }
  






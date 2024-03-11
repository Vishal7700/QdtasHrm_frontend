import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/userServices';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  selectedField: string = '';
  newUsername: string = '';
  newEmail: string = '';
  newfirstName: string = '';
  newmiddleName: string = '';
  newlastName: string = '';
  newphoneno: number = 0;
  newbirthdate: string = '';
  newdeptId: string = '';
  newgender: string = '';
  newrole: string = '';
  newdesignation: string = '';
  newpassword: string = ' ';

  uId: number = this.route.snapshot.params['uId'];


  ngOnInit() {
    this.userService.getUserById(this.uId).subscribe(
      (res: any) => {
      }
    );
  }

  onFieldSelect(event: any) {
    this.selectedField = event.target.value;
  }

  saveEditedData(data: any) {
    console.log(data);
    this.userService.updateUser(this.uId, data).subscribe(
      (res: any) => {
        this.snackBar.open('User updated Successfully', 'OK' , {
          duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
         })
      },
      (error) => {
        this.snackBar.open('Error in updating user', 'OK' , {
          duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
         })
      }
    );
  }
}

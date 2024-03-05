import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/userServices';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }
  receivedId!: any;

  user!: User;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.receivedId = params.get('uId');
    });
    this.getUserById(this.receivedId);
  }

  getUserById(uId: number) {
    this.userService.getUserById(uId).subscribe(
      (response: User) => {
        this.user = response;
        console.log(this.user);
      },
      (error: any) => {
        console.log(error.error.message);
      }
    );

  }






}

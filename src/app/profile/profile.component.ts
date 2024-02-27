import { Component, HostListener } from '@angular/core';
import { UserService } from '../service/userServices';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  sideNavStatus: boolean = false;


  constructor(private UserService: UserService) {

  }
  // ngOnInit() {
  //   this.UserService.profile();
  // }

}


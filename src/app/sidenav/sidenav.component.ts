import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

 @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'Admin',
      icon: 'fa-sharp fa-solid fa-user-tie',
      route: '/profile'
    },
     {
      number: '2',
      name: 'Leave',
      icon: 'fa-sharp fa-solid fa-calendar-days',
      route: '/leave'
    },
     {
      number: '3',
      name: 'Time',
      icon: 'fa-sharp fa-solid fa-clock',
      route: '/time'
    },
     {
      number: '4',
      name: 'My Info',
      icon: 'fa-sharp fa-solid fa-circle-info',
      route: '/myinfo'
    },
     {
      number: '5',
      name: 'Recruitment',
      icon: 'fa-sharp fa-solid fa-user-check',
    },
  ]


constructor () {}

ngOnInit(): void {
  
}

}

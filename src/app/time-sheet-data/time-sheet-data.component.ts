import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/userServices';
import { Time } from '../model/time';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-time-sheet-data',
  templateUrl: './time-sheet-data.component.html',
  styleUrls: ['./time-sheet-data.component.css']
})
export class TimeSheetDataComponent {

    sideNavStatus: boolean = false;
    isSidebarExpanded: boolean = true;
   

    onToggleSidebar(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  constructor(private route: ActivatedRoute,
    private userService: UserService,    ){}

  private subscriptions: Subscription[] = [];
  timeSheets: Time[] = [];
  resultPage: number = 1;
  resultSize: number = 10;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  isLoading: boolean = false; 


  ngOnInit() {
  
    this.route.paramMap.subscribe(params => {
      const eid: Number = parseInt(params.get ('eId') as string);
      this.loadTimeSheet(1,eid);
    });
  }
    loadTimeSheet(currentPage: number , eId: Number) {
       this.subscriptions.push(
      this.userService.getTimeSheetByEmpId(eId).subscribe(
        (l: Time[]) => {
          this.timeSheets.push(...l);
          if (this.timeSheets.length <= 0 && this.resultPage === 1)
            if (this.timeSheets.length <= 0) this.hasMoreResult = false;
          this.fetchingResult = false;
          this.resultPage++;
        }, (error) => {
          console.log(error);
        }
      )
    );
  }

  loadMoreTimeSheet(): void {
    this.isLoading = true;
    this.loadMoreTimeSheet();
    setTimeout(() => {
       this.isLoading = false;
    }, 1000);
  }

}



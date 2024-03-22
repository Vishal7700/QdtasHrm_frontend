import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LeaveComponent } from './leave/leave.component';
import { TimeComponent } from './time/time.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TempPasswordComponent } from './temp-password/temp-password.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from 'src/app/add-user/filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    AddUserComponent,
    SidenavComponent,
    LeaveComponent,
    TimeComponent,
    MyInfoComponent,
    EditUserComponent,
    ResetPasswordComponent,
    TempPasswordComponent,
    DialogboxComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  MatProgressBarModule,
    BrowserAnimationsModule,
      MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
    
  

    
  


  ],
  providers: [],
  bootstrap: [AppComponent],
 
})
export class AppModule { }

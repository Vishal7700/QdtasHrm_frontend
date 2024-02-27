import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path: ''
  },
   {
    component:ProfileComponent,
    path: 'profile'
  },
   {
    component:AddUserComponent,
    path: 'adduser'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

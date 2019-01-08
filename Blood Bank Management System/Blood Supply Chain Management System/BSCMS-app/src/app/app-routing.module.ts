import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterhospitalComponent } from './registerhospital/registerhospital.component';
import { from } from 'rxjs';
import { SearchDonarComponent } from './search-donar/search-donar.component';
import { HospitalHomePageComponent } from './hospital-home-page/hospital-home-page.component';
import { UpdateProfileUserComponent } from './update-profile-user/update-profile-user.component';
import { SearchBloodBankComponent } from './search-blood-bank/search-blood-bank.component';
import { ViewAppointmentHospitalComponent } from './view-appointment-hospital/view-appointment-hospital.component';
import { ViewAppointmentUserComponent } from './view-appointment-user/view-appointment-user.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthGuard } from './_guards';
import { AppointmentCalenderComponent } from './appointment-calender/appointment-calender.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '', component: UserHomePageComponent, canActivate: [AuthGuard] },
  { path: '', component: HospitalHomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  { path: 'userhomepage', component: UserHomePageComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'registerhospital', component: RegisterhospitalComponent},
  { path: 'searchdonar', component: SearchDonarComponent},
  { path: 'hospitalhomepage', component: HospitalHomePageComponent },
  { path : 'updateprofile' , component : UpdateProfileUserComponent},
  { path : 'searchbloodbank' , component : SearchBloodBankComponent},
  { path : 'viewAppointmentHospital' , component : ViewAppointmentHospitalComponent},
  { path : 'viewAppointmentUser' , component : ViewAppointmentUserComponent},
  { path : 'appointmentCalender', component: AppointmentCalenderComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

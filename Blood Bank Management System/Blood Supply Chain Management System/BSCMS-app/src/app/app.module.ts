import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CustomMaterialModule } from './core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterhospitalComponent } from './registerhospital/registerhospital.component';
import { SearchDonarComponent } from './search-donar/search-donar.component';
import { HospitalHomePageComponent } from './hospital-home-page/hospital-home-page.component';
import { UpdateProfileUserComponent } from './update-profile-user/update-profile-user.component';
import { SearchBloodBankComponent } from './search-blood-bank/search-blood-bank.component';
import { ViewAppointmentHospitalComponent } from './view-appointment-hospital/view-appointment-hospital.component';
import { ViewAppointmentUserComponent } from './view-appointment-user/view-appointment-user.component';
import { MatDialogModule } from "@angular/material";
import { ScheduleAppointment } from './view-appointment-user/view-appointment-user.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { JasperoAlertsModule } from '@jaspero/ng-alerts';
import { AppointmentCalenderComponent } from './appointment-calender/appointment-calender.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginComponent,
    UserHomePageComponent,
    ForgotpasswordComponent,
    RegisterhospitalComponent,
    SearchDonarComponent,
    HospitalHomePageComponent,
    UpdateProfileUserComponent,
    SearchBloodBankComponent,
    ViewAppointmentHospitalComponent,
    ViewAppointmentUserComponent,
    ScheduleAppointment,
    AppointmentCalenderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    JasperoAlertsModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })

  ],
  providers: [AppComponent],
  bootstrap: [AppComponent],
  entryComponents: [ScheduleAppointment, ViewAppointmentUserComponent],
})
export class AppModule { }

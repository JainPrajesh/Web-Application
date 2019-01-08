import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-view-appointment-hospital',
  templateUrl: './view-appointment-hospital.component.html',
  styleUrls: ['./view-appointment-hospital.component.scss']
})
export class ViewAppointmentHospitalComponent implements OnInit {

   // Setting up coloum of appointment table of hospital
  displayedColumns: string[] = ['donorname', 'donorEmailId', 'donorBloodGroup', 'HospitalName', 'HospitalEmailID', 'ZipCode', 'AppointmentStatus', 'AppointmentDate','buttons'];
  dataSource: any;
  

    senderUserEmailId : String;
    senderUserName : String;
    senderUserBloodGroup : String;
    hospitalName: String;
    hospitalEmailId: String;
    hospitalZipCode: String;
    appointmentStatus : String;
    appointmentDate : String;
    appointmentTime : String;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _alert: AlertsService) {
    this.route.queryParams.subscribe(params => {
      this.hospitalEmailId = params["hospitalEmailId"];
    });
	// Refreshing appointment for current hospital
    this.getAppointment();
  }

  // Fetching all appointment associated with current hospital
  getAppointment() {
    this.http.get('http://localhost:3000/appointments/' + this.hospitalEmailId)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  // Alert Pop up
  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  ngOnInit() {
  }

  // Function to approve appointment between a hospital and a donar
  confirmAppointment(value)
  {
	// Fetching up appointment to check if current status of appointment  
    this.http.get('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === 'Pending for Confirmation') {
          const appointmentData = { appointmentStatus: "Appointment Confirmed", appointmentDate : value.appointmentDate};
		  //Updating the selected appointment to approved 
          this.http.put('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId, appointmentData)
            .subscribe((data) => {

              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Appointment Confirmed', 'Appointment Confirmed', options);
              this.getAppointment();

            })
        }
        else {
			
		 // If appointment status is other then Pending for confirmation then throwing up an error 
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Cannot Confirm Appointment Yet', 'Cannot Confirm Appointment Yet', options);
          this.getAppointment();
        }
      })
  }

  // Function to mark selected appointment as complete
  completeRequest(value)
  {
	// Fetching up current statuts of appointment  
    this.http.get('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === 'Appointment Confirmed') {
		  // Updating the status of appointment to Request completed if appointment status is appointment confirmed		
          const appointmentData = { appointmentStatus: "Request Completed", appointmentDate : value.appointmentDate};
          this.http.put('http://localhost:3000/appointments/' + value.senderUserEmailId + "/" + value.hospitalEmailId, appointmentData)
            .subscribe((data) => {

              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Request has been marked as complete', 'Request has been marked as complete', options);
              this.getAppointment();

            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Cannot mark appointment as complete yet', 'Cannot mark appointment as complete yet', options);
          this.getAppointment();
        }
      })
  }

  // Navigating to view appointment of hospital page with parms
  viewAppointmentHospital() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/viewAppointmentHospital'], navigationExtras);

  }

  // Navigating to hospital home page of hospital with parms
  hospitalHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/hospitalhomepage'], navigationExtras);
  }

 // Navigating to appointment calender of user page with parms 
 appointmentCalenderPage()
 {
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "hospitalEmailId": this.hospitalEmailId,
    }
  }
  this.router.navigate(['/appointmentCalender'], navigationExtras);
 }

}

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-view-appointment-user',
  templateUrl: './view-appointment-user.component.html',
  styleUrls: ['./view-appointment-user.component.scss']
})
export class ViewAppointmentUserComponent implements OnInit {

  animal: string;
  name: string;

  emailId: any;
  displayedColumns: string[] = ['donorname', 'donorEmailId', 'donorBloodGroup', 'HospitalName', 'HospitalEmailID', 'ZipCode', 'AppointmentStatus', 'AppointmentDate', 'buttons'];
  dataSource: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private dialog: MatDialog, private _alert: AlertsService) {

    this.route.queryParams.subscribe(params => {
      this.emailId = params["emailId"];
    });
    this.getAppointment();
  }

  // Alert popup
  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }
  
  // Function to open dialog box for choosing appointment date
  openDialog(element): void {
    console.log(element.senderUserEmailId)
    const dialogRef = this.dialog.open(ScheduleAppointment, {
      width: '400px', height: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAppointment();
    });
  }

  // Fetching all appointment associated with current user
  getAppointment() {
    this.http.get('http://localhost:3000/appointments/' + this.emailId)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  // Navigating to user home page with parms
  userHomePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/userhomepage'], navigationExtras);
  }
  
  // Navigating to update profile page of user with parms
  updateProfilePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/updateprofile'], navigationExtras);
  }

  // Navigating to search donar page of hospital page with parms
  searchDonorPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchdonar'], navigationExtras);
  }

  // Navigating to search blood bank page with parms
  searchBloodBankPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchbloodbank'], navigationExtras);
  }

  // Navigating to view appointment of user with parms
  viewAppointmentUser()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/viewAppointmentUser'], navigationExtras);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'scheduleAppointment',
  templateUrl: './scheduleAppointment.html',
})
export class ScheduleAppointment {
// Component for schedule appointment pop window

  appointmentDate: String = "";
  constructor(
    public dialogRef: MatDialogRef<ScheduleAppointment>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private _alert: AlertsService) { }

  // Function to close schedule appointment pop up	
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Alert pop up
  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  // Function to confirm appointment for user
  confirmAppointment() {
    console.log("Fron confirm appointment");'
	// Fetching up status appointment for select appointment between donar and appointment
    this.http.get('http://localhost:3000/appointments/' + this.data.senderUserEmailId + "/" + this.data.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === 'Approved') {
		  // Updating status os appointment to Pending for confirmation of appointment 	
          const appointmentData = { appointmentStatus: "Pending for Confirmation", appointmentDate: this.appointmentDate };
          this.http.put('http://localhost:3000/appointments/' + this.data.senderUserEmailId + "/" + this.data.hospitalEmailId, appointmentData)
            .subscribe((data) => {

              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Appointment confirmed, Waiting for confirmation from hospital', 'Appointment confirmed, Waiting for confirmation from hospital', options);
              this.dialogRef.close();

            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Can not book appointment Yet', 'Can not book appointment Yet', options);
          this.dialogRef.close();
        }
      })
    console.log(this.appointmentDate);
    console.log(this.data.senderUserEmailId);
  }

}
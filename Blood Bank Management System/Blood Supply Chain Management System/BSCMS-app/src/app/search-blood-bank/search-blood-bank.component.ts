import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-search-blood-bank',
  templateUrl: './search-blood-bank.component.html',
  styleUrls: ['./search-blood-bank.component.scss']
})
export class SearchBloodBankComponent implements OnInit {

  displayedColumns: string[] = ['hospitalName', 'hospitalEmailId', 'hospitalZipCode'];
  zipCodeValue: String = "";
  dataSource: any;
  emailId: String;
  jsonData: any;
  appointment: Appointment;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _alert: AlertsService) {
    this.route.queryParams.subscribe(params => {
      this.emailId = params["emailId"];
    });

    this.http.get('http://localhost:3000/users/' + this.emailId)
      .subscribe((data) => {
        this.jsonData = data;
        console.log("Data Fetched through API ")
        console.log(this.jsonData[0]);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  //Navigate to search donor page
  searchDonorPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchdonar'], navigationExtras);
  }
  //Navigate to blood bank page 
  searchBloodBankPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchbloodbank'], navigationExtras);
  }

  // Navigate to view user appointment page
  viewAppointmentUser() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/viewAppointmentUser'], navigationExtras);
  }

  ngOnInit() {
  }

  // User can search blood banks based on zip code
  searchBloodBank() {
    this.http.get('http://localhost:3000/hospitals/' + this.zipCodeValue)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }
// User will be navigated to updated profile
  updateProfilePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/updateprofile'], navigationExtras);
  }
  // User will be navigated to home page
  userHomePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/userhomepage'], navigationExtras);
  }
  
  // To book appointment
  bookAppointment(element) {
    this.http.get('http://localhost:3000/connections/' + this.jsonData[0].emailId + "/" + element.emailId)
      .subscribe((data) => {
        this.dataSource = data;
        if (data[0] === undefined) {
          this.appointment = new Appointment(this.jsonData[0].emailId, this.jsonData[0].name, this.jsonData[0].bloodGroup, element.hospitalName, element.hospitalEmailId, element.hospitalStreetAddress, element.hospitalCity, element.hospitalZipCode, element.hospitalState, element.hospitalContactNumber, "Received at Hospital", null, null);
          this.http.post('http://localhost:3000/appointments', this.appointment)
            .subscribe((data) => {
              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Appointment has been booked with Hospital'+element.hospitalName, 'Message', options);
              console.log(data)
            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Appointment already exist', 'Message', options);
        }
      });
  }
} 

class Appointment {
  senderUserEmailId: String;
  senderUserName: String;
  senderUserBloodGroup: String;
  hospitalName: String;
  hospitalEmailId: String;
  hospitalStreetAddress: String;
  hospitalCity: String;
  hospitalZipCode: String;
  hospitalState: String;
  hospitalContactNumber: String;
  appointmentStatus: String;
  appointmentDate: String;
  appointmentTime: String;
  constructor(senderUserEmailId: String, senderUserName: String, senderUserBloodGroup: String, hospitalName: String, hospitalEmailId: String, hospitalStreetAddress: String, hospitalCity: String, hospitalZipCode: String, hospitalState: String, hospitalContactNumber: String, appointmentStatus: String, appointmentDate: String, appointmentTime: String) {
    this.senderUserEmailId = senderUserEmailId;
    this.senderUserName = senderUserName;
    this.senderUserBloodGroup = senderUserBloodGroup;
    this.hospitalName = hospitalName;
    this.hospitalEmailId = hospitalEmailId;
    this.hospitalStreetAddress = hospitalStreetAddress;
    this.hospitalCity = hospitalCity;
    this.hospitalZipCode = hospitalZipCode;
    this.hospitalState = hospitalState;
    this.hospitalContactNumber = hospitalContactNumber;
    this.appointmentStatus = appointmentStatus;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
  }
}

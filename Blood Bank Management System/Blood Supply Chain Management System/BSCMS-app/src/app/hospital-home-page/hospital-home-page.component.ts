import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-hospital-home-page',
  templateUrl: './hospital-home-page.component.html',
  styleUrls: ['./hospital-home-page.component.scss']
})
export class HospitalHomePageComponent implements OnInit {

  hospitalEmailId: String = "";
  dataSource: any;
  jsonData: any;

  hospitalName: String = "";
  hospitalRegistrationNumber: String = "";
  hospitalStreetAddress: String = "";
  hospitalCity: String = "";
  hospitalZipCode: String = "";
  hospitalState: String = "";
  hospitalContactNumber: String = "";
  hospitalPassword: String = "";



  displayedColumns: string[] = ['DonorName', 'BloodGroup', 'AppointmentStatus', 'buttons'];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _alert: AlertsService) {
    this.route.queryParams.subscribe(params => {
      this.hospitalEmailId = params["hospitalEmailId"];
      this.hospitalZipCode = params["hospitalZipCode"];
    });

    console.log("Hospital Home Page " + this.hospitalEmailId)

    this.http.get('http://localhost:3000/hospitals/' + this.hospitalEmailId + "/" + this.hospitalZipCode)
      .subscribe((data) => {
        this.jsonData = data;
        this.hospitalName = data[0].hospitalName
        this.hospitalRegistrationNumber = data[0].hospitalRegistrationNumber;
        this.hospitalStreetAddress = data[0].hospitalStreetAddress;
        this.hospitalCity = data[0].hospitalCity;
        this.hospitalState = data[0].hospitalState;
        this.hospitalZipCode = data[0].hospitalZipCode;
        this.hospitalContactNumber = data[0].hospitalContactNumber;
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
    this.getAppointment();
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  ngOnInit() {
  }

  getAppointment() {
    this.http.get('http://localhost:3000/appointments/' + this.hospitalEmailId)
      .subscribe((data) => {
        console.log(data[0].senderUserEmailId)
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  approveAppointment(element) {
    console.log(this.hospitalEmailId);
    this.http.get('http://localhost:3000/appointments/' + element.senderUserEmailId + "/" + this.hospitalEmailId)
      .subscribe((data) => {
        if (data[0].appointmentStatus === '	Pending for Confirmation') {
          let Appointment = {
            appointmentStatus: "Approved"
          }
          this.http.put('http://localhost:3000/appointments/' + element.senderUserEmailId + "/" + this.hospitalEmailId, Appointment)
            .subscribe((data) => {
              console.log(data);
              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Request Approved', 'Request Approved', options);
              this.getAppointment();
              if (data[0] === undefined) {
                console.log("Undefine");
              }
            })
        }
        else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Appointment already approved', 'Appointment already approved', options);
        }
      })
  }

  cancelRequest(element) {
    this.http.delete('http://localhost:3000/appointments/' + element.senderUserEmailId + "/" + this.hospitalEmailId)
      .subscribe((data) => {
        console.log(data);
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        this.openAlert('success', 'Request Has been Canceled', 'Request Has been Canceled', options);
        this.getAppointment();
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }


  viewAppointmentHospital() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/viewAppointmentHospital'], navigationExtras);

  }

  hospitalHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/hospitalhomepage'], navigationExtras);
  }

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

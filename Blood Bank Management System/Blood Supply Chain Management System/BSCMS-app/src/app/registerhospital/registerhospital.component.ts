import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-registerhospital',
  templateUrl: './registerhospital.component.html',
  styleUrls: ['./registerhospital.component.scss']
})

export class RegisterhospitalComponent implements OnInit {

  hospitalName: String = "";
  hospitalRegistrationNumber: String = "";
  hospitalEmailId: String = "";
  hospitalStreetAddress: String = "";
  hospitalCity: String = "";
  hospitalZipCode: String = "";
  hospitalState: String = "";
  hospitalContactNumber: String = "";
  hospitalPassword: String = "";
  hospital: Hospital;
  error: boolean;
  constructor(private http: HttpClient, private _alert: AlertsService) { }
 
  ngOnInit() {
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }
//register hospital to the data
  register() {
    console.log()
    if (this.hospitalName === "" || this.hospitalRegistrationNumber === "" || this.hospitalEmailId === "" || this.hospitalStreetAddress === "" || this.hospitalCity === "" || this.hospitalZipCode === "" || this.hospitalState === "" || this.hospitalContactNumber === "" || this.hospitalPassword === "") {
      this.error = true;
    }
    else {
      this.hospital = new Hospital(
        this.hospitalName, this.hospitalRegistrationNumber, this.hospitalEmailId, this.hospitalStreetAddress, this.hospitalCity, this.hospitalZipCode, this.hospitalState, this.hospitalContactNumber, this.hospitalPassword
      );

      this.http.post('http://localhost:3000/hospitals', this.hospital)
        .subscribe((data) => {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('success', 'Account created Successfully', 'Request Approved', options); //the alert is activated when credentials are verified
          let textFields = document.getElementsByTagName("input");
          for (let i = 0; i < textFields.length; i++) {
            textFields[i].value = "";
          }
          this.error = false;

          console.log(data)
        })
    }
  }
}

class Hospital {
  hospitalName: String;
  hospitalRegistrationNumber: String;
  hospitalEmailId: String;
  hospitalStreetAddress: String;
  hospitalCity: String;
  hospitalZipCode: String;
  hospitalState: String;
  hospitalContactNumber: String;
  hospitalPassword: String;

  constructor(hospitalName: String, hospitalRegistrationNumber: String, hospitalEmailId: String, hospitalStreetAddress: String, hospitalCity: String, hospitalZipCode: String, hospitalState: String, hospitalContactNumber: String, hospitalPassword: String, ) {
    this.hospitalName = hospitalName;
    this.hospitalRegistrationNumber = hospitalRegistrationNumber;
    this.hospitalEmailId = hospitalEmailId;
    this.hospitalStreetAddress = hospitalStreetAddress;
    this.hospitalCity = hospitalCity;
    this.hospitalZipCode = hospitalZipCode;
    this.hospitalState = hospitalState;
    this.hospitalContactNumber = hospitalCity;
    this.hospitalPassword = hospitalCity;
  }
}
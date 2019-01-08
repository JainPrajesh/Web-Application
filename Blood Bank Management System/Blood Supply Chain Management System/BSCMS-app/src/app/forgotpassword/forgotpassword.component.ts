import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  emailId : string = "";

  constructor(private http: HttpClient, private _alert: AlertsService) { }

  ngOnInit() {
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

//method to retrieve password if user forgets the password
  forgorPassword()
  {
    this.http.get('http://localhost:3000/users/' + this.emailId)
    .subscribe((data) => {
      console.log(data);
	  //to check if the entered email address is correct
      if (data[0] === undefined) {
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        this.openAlert('error', 'Please enter correct email address', 'Message', options); //alert if the entered address is incorrect
      }
	  //if the email address is correct a mail will be sent to the donor
      else{
        const emailDetails = {
          to: "barua.m@husky.neu.edu",
          subject: "Blood Supply Chain Management System : Request for Blood DOnation",
          text: "Your Password for email ID "+this.emailId+" is "+data[0].password,
        }
        this.http.post('http://localhost:3000/emails/' + this.emailId, emailDetails)
          .subscribe((data) => {
            console.log(data)
          })
		  //an alert with mail sent confirmation
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        this.openAlert('success', 'Password has been sent to you email ID', 'Message', options);
      }
    })
  }

}

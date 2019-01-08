import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-update-profile-user',
  templateUrl: './update-profile-user.component.html',
  styleUrls: ['./update-profile-user.component.scss']
})
export class UpdateProfileUserComponent implements OnInit {

  name: String;
  emailId: String;
  streetAddress: String;
  city: String;
  zipCode: String;
  state: String;
  gender: String;
  dateofBirth: Date;
  bloodGroup: String;
  contactNumber: String;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _alert: AlertsService) {
    this.route.queryParams.subscribe(params => {
      this.emailId = params["emailId"];
    });

    this.http.get('http://localhost:3000/users/' + this.emailId)
      .subscribe((data) => {
        this.name = data[0].name
        this.emailId = data[0].emailId;
        this.streetAddress = data[0].streetAddress;
        this.city = data[0].city;
        this.zipCode = data[0].zipCode;
        this.state = data[0].state;
        this.gender = data[0].gender;
        this.dateofBirth = data[0].dateofBirth;
        this.bloodGroup = data[0].bloodGroup;
        this.contactNumber = data[0].contactNumber;
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
   }

  ngOnInit() {
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  // update user profile
  updateProfile()
  {
    console.log("Inside Update Profile")
    const User = {
        name : this.name,
        emailId : this.emailId,
        streetAddress : this.streetAddress,
        city : this.city,
        zipCode : this.zipCode,
        state : this.state,
        gender : this.gender,
        dateofBirth : this.dateofBirth,
        bloodGroup : this.bloodGroup,
        contactNumber : this.contactNumber,
    }
    this.http.put('http://localhost:3000/users/' + this.emailId, User)
      .subscribe((data) => {
        console.log("Inside PUT");
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        this.openAlert('success', 'Profile Updated', 'Profile Updated', options);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }
 
 // Navigate to the search donor page 
  searchDonorPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchdonar'], navigationExtras);
  }

  // Navigate to the search blood bank page
  searchBloodBankPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchbloodbank'], navigationExtras);
  }

  // Navigate to the user home page
  userHomePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/userhomepage'], navigationExtras);
  }
  
  // To view user appointments
  viewAppointmentUser() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/viewAppointmentUser'], navigationExtras);
  }

  // Navigate to update profile page
  updateProfilePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/updateprofile'], navigationExtras);
  }
}

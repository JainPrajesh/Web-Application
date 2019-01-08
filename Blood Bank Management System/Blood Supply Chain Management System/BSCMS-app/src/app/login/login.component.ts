import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String = "";
  password: String = "";
  loginClass: login;
  hospitalLogin: HospitalLogin;
  options: any;
  error: boolean;
  invalidUser: boolean;
  userType: String = "";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  // Function to verifty user credentails
  login() {
    if (this.username === "" || this.password === "") {
      this.error = true;
    }
    else {
      this.loginClass = new login(this.username, this.password);
      this.options = {
        body: this.loginClass
      }
	  // Checking if user exisit on system or not
      this.http.post('http://localhost:3000/users/authenicate', this.loginClass)
        .subscribe((data) => {
          if (Object.keys(data).length === 0) {
            console.log("Hospital");
            this.hospitalLogin = new HospitalLogin(this.username, this.password);
            this.http.post('http://localhost:3000/hospitals/authenicate', this.hospitalLogin)
              .subscribe((data) => {
                console.log()
                if (data[0] === undefined) {
                  this.invalidUser = true;
                }
                else {
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                      "hospitalEmailId": data[0].hospitalEmailId,
                      "hospitalZipCode": data[0].hospitalZipCode,
                    }
                  };
                  this.router.navigate(['/hospitalhomepage'], navigationExtras);
                }
              })

          }
          else {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                "emailId": data[0].emailId,
              }
            };
            this.router.navigate(['/userhomepage'], navigationExtras);
          }
        })
    }
  }


}
// Class for login
class login {
  emailId: String;
  password: String;
  constructor(emailId: String, password: String) {
    this.emailId = emailId;
    this.password = password;
  }
}

class HospitalLogin {
  hospitalEmailId: String;
  hospitalPassword: String;
  constructor(hospitalEmailId: String, hospitalPassword: String) {
    this.hospitalEmailId = hospitalEmailId;
    this.hospitalPassword = hospitalPassword;
  }
}
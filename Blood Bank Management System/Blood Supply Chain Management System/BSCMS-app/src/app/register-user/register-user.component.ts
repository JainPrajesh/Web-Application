import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  response: any;
  name: String = "";
  emailId: string = "";
  streetAddress: String = "";
  city: String = "";
  zipCode: string = "";
  state: String = "";
  gender: String = "";
  dateofBirth: Date;
  bloodGroup: String = "";
  contactNumber: string = "";
  password: String = "";
  user: User;
  options: any;
  confirmPassword: String = "";
  error: boolean = false;
  regexp: RegExp;

  constructor(private http: HttpClient, private _alert: AlertsService) { }

  ngOnInit() {
  }

  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  isEmail(search: string): boolean {
    var serchfind: boolean
    var EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    this.regexp = new RegExp(EMAIL_REGEXP);

    serchfind = this.regexp.test(search);

    console.log(serchfind)
    return serchfind
  }

  isContactNumber(search: string): boolean {
    var serchfind: boolean
    var NUMBER_REGEXP = /^\+?\d{10}$/;

    this.regexp = new RegExp(NUMBER_REGEXP);

    serchfind = this.regexp.test(search);

    console.log(serchfind)
    return serchfind
  }

  isZipCode(search: string): boolean {
    var serchfind: boolean
    var ZIPCODE_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;

    this.regexp = new RegExp(ZIPCODE_REGEXP);

    serchfind = this.regexp.test(search);

    console.log(serchfind)
    return serchfind
  }

//register user on the data
  register() {
    console.log("Date Value " + this.dateofBirth);

    if (this.name === "" || this.emailId === "" || this.streetAddress === "" || this.city === "" || this.zipCode === "" || this.state === "" || this.contactNumber === "" || this.password === "") {
      this.error = true;
    }
    else {
      if (this.password === this.confirmPassword) {
        if (this.isEmail(this.emailId) === true) {
          if (this.isContactNumber(this.contactNumber) === true) {
            if (this.isZipCode(this.zipCode) === true) {
              this.user = new User(this.name, this.emailId, this.streetAddress, this.city, this.zipCode, this.state, this.gender, this.dateofBirth, this.bloodGroup, this.contactNumber, this.password);
              this.http.post('http://localhost:3000/users', this.user)
                .subscribe(() => {
                  const options = {
                    overlay: true,
                    overlayClickToClose: true,
                    showCloseButton: true,
                    duration: 5000
                  };
                  this.openAlert('success', 'Account Created Successfully', 'Account Created Successfully', options); //once the credentials are verified, a new account gets created
                  let textFields = document.getElementsByTagName("input");
                  for (let i = 0; i < textFields.length; i++) {
                    textFields[i].value = "";
                  }
                  this.error = false;
                  console.log(this.user)
                })
            } else {
              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('error', 'Please enter valid Zip Code', 'Please enter valid Zip Code', options); //Zip Code needs to be 5 digits
            }
          }
          else {
            const options = {
              overlay: true,
              overlayClickToClose: true,
              showCloseButton: true,
              duration: 5000
            };
            this.openAlert('error', 'Please enter valid contact Number', 'Please enter valid contact Number', options); //contact number needs to be 10 digits
          }
        } else {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'Email Id is not valid', 'Email Id is not valid', options); //error arises when email ID is invalid
        }
      } else {
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        this.openAlert('error', 'Password and confirm Password should be same', 'Password and confirm Password should be same', options); //error given as the two passwords entered are different
      }
    }
  }
]}


class User {
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
  password: String;
  constructor(name: String, emailId: String, streetAddress: String, city: String, zipCode: String, state: String, gender: String, dateofBirth: Date, bloodGroup: String, contactNumber: String, password: String) {
    console.log("Const Value " + name);
    this.name = name,
      this.emailId = emailId,
      this.streetAddress = streetAddress,
      this.city = city,
      this.zipCode = zipCode,
      this.state = state,
      this.gender = gender,
      this.dateofBirth = dateofBirth,
      this.bloodGroup = bloodGroup,
      this.contactNumber = contactNumber,
      this.password = password;
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'donorname', 'bloodGroup', 'status', 'buttons'];
  dataSource: any;

  data: any;

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
  jsonData: any;
  connectionData: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _alert: AlertsService, ) {

	// Fetching user email from login params
    this.route.queryParams.subscribe(params => {
      this.emailId = params["emailId"];
    });
	
	// Fetching data from mongodb  for user details of user home page 
    this.http.get('http://localhost:3000/users/' + this.emailId)
      .subscribe((data) => {
		// Assigning all details of current user from data fetched  
        this.jsonData = data;
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

	// Refreshing connections  
    this.getConnection();

  }

  // Fetching all connection associated of current user 
  getConnection() {
    this.http.get('http://localhost:3000/connections/' + this.emailId)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  ngOnInit() {
  }
  
  // Navigating to search donor page with params
  searchDonorPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchdonar'], navigationExtras);
  }

  // Navigating to user home page with params
  userHomePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/userhomepage'], navigationExtras);
  }
  
  //Navigating to search blood bank page with params
  searchBloodBankPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchbloodbank'], navigationExtras);
  }

  // Navigating to view appointment of user page with parms
  viewAppointmentUser() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/viewAppointmentUser'], navigationExtras);
  }

  //Navigating to update profile page with params
  updateProfilePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/updateprofile'], navigationExtras);
  }

  // Alert Pop up
  openAlert(type: AlertType, title: string, message: string, options: AlertSettings) {
    this._alert.create(type, title, message, options);
  }

  // Function to approve connection 
  approveConnection(element) {
    console.log(this.emailId);
	// Checking the status of connection between sender and donar
    this.http.get('http://localhost:3000/connections/' + element.senderUserEmailId + "/" + this.emailId)
      .subscribe((data) => {
        if (data[0] === undefined || data[0].status === 'Approved') {
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'You are not authorized to approve this request or request is already approved', 'Message', options);
        }
        else {
          let Connection = {
            status: "Approved"
          }
		  // Updating the status of connection to approve
          this.http.put('http://localhost:3000/connections/' + element.senderUserEmailId + "/" + this.emailId, Connection)
            .subscribe((data) => {
              console.log(data);
              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Request Approved', 'Request Approved', options);
              this.getConnection();
              if (data[0] === undefined) {
                console.log("Undefine");
              }
            })
        }
      })
  }

  // Function to cancel the connection between sender and receiver
  cancelRequest(element) {
    this.http.delete('http://localhost:3000/connections/' + element.senderUserEmailId + "/" + this.emailId)
      .subscribe((data) => {
        console.log(data);
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        this.openAlert('success', 'Request has been cancelled', 'Request has been cancelled', options);
        this.getConnection();
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }
}


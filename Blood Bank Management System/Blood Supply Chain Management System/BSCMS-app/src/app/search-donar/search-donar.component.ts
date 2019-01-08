import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { element } from '@angular/core/src/render3';
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-search-donar',
  templateUrl: './search-donar.component.html',
  styleUrls: ['./search-donar.component.scss']
})
export class SearchDonarComponent implements OnInit {

  zipCodeValue: String = "";
  bloodGroupVaue: String = "";
  jsonData: any;
  jsonSize: number;
  emailId: String;
  connection: Connection;
  displayedColumns: string[] = ['name', 'bloodGroup', 'zipCode'];

  dataSource: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private _alert: AlertsService,) {
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

  ngOnInit() {
  }

  // Search donors based on blood group and zip code
  searchDonor() {
    this.http.get('http://localhost:3000/users/' + this.zipCodeValue + "/" + this.bloodGroupVaue)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }

  // To navigate to search donor page
  searchDonorPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchdonar'], navigationExtras);
  }

  // To navigate to search blood bank page
  searchBloodBankPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/searchbloodbank'], navigationExtras);
  }

  // To view user appointments
  viewAppointmentUser()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/viewAppointmentUser'], navigationExtras);
  }

  //Navigate to update profile page 
  updateProfilePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/updateprofile'], navigationExtras);
  }
  
  //Navigate to user home page 
  userHomePage()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "emailId": this.emailId,
      }
    }
    this.router.navigate(['/userhomepage'], navigationExtras);
  }
  
  // Connect to donors
  connect(value) {
    const emailDetails = {
      to: "barua.m@husky.neu.edu",
      subject: "Blood Supply Chain Management System : Request for Blood DOnation",
      text: "Dear " + this.jsonData[0].name + ", " + value.name + " has raised blood donation request. User requires " + value.bloodGroup + ". If you are intrested to donate Blood, Then log into the portal and approve request for this user. ",
    }
    this.http.post('http://localhost:3000/emails/' + value.receiverUserEmailId, emailDetails)
      .subscribe((data) => {
        console.log(data)
      })

    this.http.get('http://localhost:3000/connections/' + this.jsonData[0].emailId + "/" + value.emailId)
      .subscribe((data) => {
        this.dataSource = data;
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
          const status: String = "Pending";
          this.connection = new Connection(this.jsonData[0].emailId, this.jsonData[0].name, this.jsonData[0].bloodGroup, value.emailId, value.name, value.bloodGroup, status);
          this.http.post('http://localhost:3000/connections', this.connection)
            .subscribe((data) => {
              const options = {
                overlay: true,
                overlayClickToClose: true,
                showCloseButton: true,
                duration: 5000
              };
              this.openAlert('success', 'Request has been sent to donor'+value.name, 'Message', options);
            
              this.searchDonor();
              console.log(data)
            })
        }
        else{
          const options = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            duration: 5000
          };
          this.openAlert('error', 'You are not authorized to approve this request or request is already approved', 'Message', options);
          this.searchDonor();
        }
      })


  }
}

class Connection {
  senderUserEmailId: String;
  senderUserName: String;
  senderUserBloodGroup: String;
  receiverUserEmailId: String;
  receiverUserName: String;
  receiverUserBloodGroup: String;
  status: String;
  constructor(senderUserEmailId: String, senderUserName: String, senderUserBloodGroup: String, receiverUserEmailId: String, receiverUserName: String, receiverUserBloodGroup: String, status: String) {
    this.senderUserEmailId = senderUserEmailId;
    this.senderUserName = senderUserName;
    this.senderUserBloodGroup = senderUserBloodGroup;
    this.receiverUserEmailId = receiverUserEmailId;
    this.receiverUserName = receiverUserName;
    this.receiverUserBloodGroup = receiverUserBloodGroup;
    this.status = status;
  }
}

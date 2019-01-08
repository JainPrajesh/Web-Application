import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router, NavigationExtras } from "@angular/router";
import { AlertsService, AlertType, AlertSettings } from '@jaspero/ng-alerts';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-appointment-calender',
  templateUrl: './appointment-calender.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./appointment-calender.component.scss']
})
export class AppointmentCalenderComponent implements OnInit {

  hospitalEmailId : string = "";
  hospitalZipCode : string = "";

  constructor(private modal: NgbModal, private route: ActivatedRoute, private http: HttpClient, private router: Router, private _alert: AlertsService) { 
    this.route.queryParams.subscribe(params => {
      this.hospitalEmailId = params["hospitalEmailId"];
      this.hospitalZipCode = params["hospitalZipCode"];
    });
    this.getAppointment();
  }

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  
  AppointmentData = [];
//event array list to assign events to the calendar
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  dataSource : any;

  

  activeDayIsOpen: boolean = true;
//function to get the appointments
  getAppointment() {
    console.log("From Appointment Method")
    this.http.get('http://localhost:3000/appointments/'+this.hospitalEmailId)
      .subscribe((data) => {
        console.log("Appointment Data "+data[0].senderUserEmailId)
        this.dataSource = data;
        for(let i=0;i<Object.keys(data).length;i++)
        {
        const Appointment = {
          start : new Date(data[i].appointmentDate),
          title : "Appointment with "+data[i].senderUserName,
          color : colors.blue,
        }
        this.AppointmentData.push(Appointment);
      }
        console.log(data);
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
  }


  FetchedData = [];

 
  events : CalendarEvent[] = this.AppointmentData;
  //function to display appointmnets on the date clicked
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  ngOnInit() {
  }


  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
//function to add new event to the calendar
  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
//function to view hospital's appointment
  viewAppointmentHospital() {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/viewAppointmentHospital'], navigationExtras);

  }

//function to navigate to the hospital home page
  hospitalHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "hospitalEmailId": this.hospitalEmailId,
      }
    }
    this.router.navigate(['/hospitalhomepage'], navigationExtras);
  }
//function to navigate to appointment calendar page
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

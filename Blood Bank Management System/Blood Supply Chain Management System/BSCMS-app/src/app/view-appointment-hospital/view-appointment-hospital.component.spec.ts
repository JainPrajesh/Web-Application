import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentHospitalComponent } from './view-appointment-hospital.component';

describe('ViewAppointmentHospitalComponent', () => {
  let component: ViewAppointmentHospitalComponent;
  let fixture: ComponentFixture<ViewAppointmentHospitalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAppointmentHospitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppointmentHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

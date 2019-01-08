import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCalenderComponent } from './appointment-calender.component';

describe('AppointmentCalenderComponent', () => {
  let component: AppointmentCalenderComponent;
  let fixture: ComponentFixture<AppointmentCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppointmentUserComponent } from './view-appointment-user.component';

describe('ViewAppointmentUserComponent', () => {
  let component: ViewAppointmentUserComponent;
  let fixture: ComponentFixture<ViewAppointmentUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAppointmentUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppointmentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

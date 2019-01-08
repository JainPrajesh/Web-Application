import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileUserComponent } from './update-profile-user.component';

describe('UpdateProfileUserComponent', () => {
  let component: UpdateProfileUserComponent;
  let fixture: ComponentFixture<UpdateProfileUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProfileUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

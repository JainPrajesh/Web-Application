import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHomePageComponent } from './hospital-home-page.component';

describe('HospitalHomePageComponent', () => {
  let component: HospitalHomePageComponent;
  let fixture: ComponentFixture<HospitalHomePageComponent>; //to wrap the component and it's template

  beforeEach(async(() => { //wrapping the callback function of beforeEach with async
  // to perform asynchronous compilation 
    TestBed.configureTestingModule({
      declarations: [ HospitalHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalHomePageComponent); //create component and test fixture
    component = fixture.componentInstance; //get test component from the fixture
    fixture.detectChanges(); //to trigger a change detection and update the view
  });

  it('should create', () => {
    expect(component).toBeTruthy(); //to make sure emitted value is correct
  });
});

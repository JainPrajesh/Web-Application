import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBloodBankComponent } from './search-blood-bank.component';

describe('SearchBloodBankComponent', () => {
  let component: SearchBloodBankComponent;
  let fixture: ComponentFixture<SearchBloodBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBloodBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBloodBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

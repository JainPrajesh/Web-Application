import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDonarComponent } from './search-donar.component';

describe('SearchDonarComponent', () => {
  let component: SearchDonarComponent;
  let fixture: ComponentFixture<SearchDonarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDonarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDonarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

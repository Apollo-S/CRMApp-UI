import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsPostsTabComponent } from './employee-details-posts-tab.component';

describe('EmployeeDetailsPostsTabComponent', () => {
  let component: EmployeeDetailsPostsTabComponent;
  let fixture: ComponentFixture<EmployeeDetailsPostsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsPostsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsPostsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTableViewAllComponent } from './common-table-view-all.component';

describe('CommonTableViewAllComponent', () => {
  let component: CommonTableViewAllComponent;
  let fixture: ComponentFixture<CommonTableViewAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTableViewAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTableViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

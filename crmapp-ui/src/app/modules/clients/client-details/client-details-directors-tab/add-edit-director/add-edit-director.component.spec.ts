import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDirectorComponent } from './add-edit-director.component';

describe('AddEditDirectorComponent', () => {
  let component: AddEditDirectorComponent;
  let fixture: ComponentFixture<AddEditDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

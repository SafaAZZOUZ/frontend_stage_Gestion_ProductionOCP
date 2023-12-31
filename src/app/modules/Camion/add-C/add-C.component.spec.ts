import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCComponent } from './add-C.component';

describe('EditComponent', () => {
  let component: AddCComponent;
  let fixture: ComponentFixture<AddCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

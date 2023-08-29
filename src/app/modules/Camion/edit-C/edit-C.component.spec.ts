import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCComponent } from './edit-C.component';

describe('EditComponent', () => {
  let component: EditCComponent;
  let fixture: ComponentFixture<EditCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

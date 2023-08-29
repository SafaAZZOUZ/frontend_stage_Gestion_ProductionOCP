import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualiteComponent } from './edit-Qualite.component';

describe('EditComponent', () => {
  let component: EditQualiteComponent;
  let fixture: ComponentFixture<EditQualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualiteComponent } from './add-Qualite.component';

describe('EditComponent', () => {
  let component: AddQualiteComponent;
  let fixture: ComponentFixture<AddQualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

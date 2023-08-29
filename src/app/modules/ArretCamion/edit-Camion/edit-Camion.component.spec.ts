import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCamionComponent } from './edit-Camion.component';

describe('EditCamionComponent', () => {
  let component: EditCamionComponent;
  let fixture: ComponentFixture<EditCamionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCamionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

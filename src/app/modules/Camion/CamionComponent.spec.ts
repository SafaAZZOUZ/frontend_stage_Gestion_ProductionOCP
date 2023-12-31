import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamionComponent } from './CamionComponent';

describe('CamionComponent', () => {
  let component: CamionComponent;
  let fixture: ComponentFixture<CamionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

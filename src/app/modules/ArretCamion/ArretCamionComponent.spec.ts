import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretCamionComponent } from './ArretCamionComponent';

describe('ArretCamionComponent', () => {
  let component: ArretCamionComponent;
  let fixture: ComponentFixture<ArretCamionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArretCamionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArretCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

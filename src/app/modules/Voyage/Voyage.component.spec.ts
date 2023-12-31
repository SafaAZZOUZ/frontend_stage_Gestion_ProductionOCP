import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageComponent } from './Voyage.component';

describe('VoyageComponent', () => {
  let component: VoyageComponent;
  let fixture: ComponentFixture<VoyageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

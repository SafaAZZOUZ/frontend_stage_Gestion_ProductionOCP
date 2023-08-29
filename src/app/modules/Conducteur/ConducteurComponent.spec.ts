import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurComponent } from './ConducteurComponent';

describe('PostsComponent', () => {
  let component: ConducteurComponent;
  let fixture: ComponentFixture<ConducteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConducteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

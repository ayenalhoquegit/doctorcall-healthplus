import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAvailabilityComponent } from './update-availability.component';

describe('UpdateAvailabilityComponent', () => {
  let component: UpdateAvailabilityComponent;
  let fixture: ComponentFixture<UpdateAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

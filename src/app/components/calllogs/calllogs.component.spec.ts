import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalllogsComponent } from './calllogs.component';

describe('CalllogsComponent', () => {
  let component: CalllogsComponent;
  let fixture: ComponentFixture<CalllogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalllogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalllogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

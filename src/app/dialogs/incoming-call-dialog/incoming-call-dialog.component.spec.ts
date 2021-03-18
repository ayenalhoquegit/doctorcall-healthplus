import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingCallDialogComponent } from './incoming-call-dialog.component';

describe('IncomingCallDialogComponent', () => {
  let component: IncomingCallDialogComponent;
  let fixture: ComponentFixture<IncomingCallDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingCallDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

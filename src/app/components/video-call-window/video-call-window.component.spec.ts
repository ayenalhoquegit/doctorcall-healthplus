import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallWindowComponent } from './video-call-window.component';

describe('VideoCallWindowComponent', () => {
  let component: VideoCallWindowComponent;
  let fixture: ComponentFixture<VideoCallWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCallWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCallWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {StreamManager} from 'openvidu-browser';

@Component({
  selector: 'ov-video',
  template: '<video #videoElement style="max-width: 100% !important;width: 100%;"></video>'
})
export class OpenViduVideoComponent implements AfterViewInit {

  @ViewChild('videoElement') elementRef: ElementRef;

  _streamManager: StreamManager;

  ngAfterViewInit(): any {
    this._streamManager.addVideoElement(this.elementRef.nativeElement);
  }

  @Input()
  set streamManager(streamManager: StreamManager) {
    this._streamManager = streamManager;
    if (!!this.elementRef) {
      this._streamManager.addVideoElement(this.elementRef.nativeElement);
    }
  }

}
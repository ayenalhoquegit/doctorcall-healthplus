import {Component, Input} from '@angular/core';
import {StreamManager} from 'openvidu-browser';

@Component({
  selector: 'user-video',
  styles: [`
    ov-video {
      width: 100%;
      height: auto;
      float: left;
      cursor: pointer;
    }

    div div {
      position: absolute;
      background: #f8f8f8;
      color: #777777;
      font-weight: bold;
      border-bottom-right-radius: 4px;
    }

    p {
      margin: 0;
    }`],
  template: `
    <div>
      <ov-video [streamManager]="streamManager"></ov-video>
    </div>`
})
export class UserVideoComponent {

  @Input()
  streamManager: StreamManager;

  getNicknameTag(): any { // Gets the nickName of the user
    return JSON.parse(this.streamManager.stream.connection.data).clientData;
  }
}

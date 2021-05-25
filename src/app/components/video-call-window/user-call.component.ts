import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {OpenVidu, Publisher, Session, StreamEvent, StreamManager, Subscriber} from 'openvidu-browser';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';

export let browserRefresh = false;

@Component({
  selector: 'app-user-video-call-window',
  templateUrl: './user-call.component.html',
  styleUrls: ['./user-call.component.css']
})

export class UserVideoCallWindowComponent implements OnDestroy, OnInit {
  OV: OpenVidu;
  session: Session;
  publisher: Publisher;
  subscribers: StreamManager[] = [];
  timer: Subscription;
  mainStreamManager: StreamManager;
  peerID: any;
  msisdn: any;

  myToken: string;
  subsState: string;
  volumeState: string;

  ring: any;
  mistaken_drop: any;
  appointment_id: any;
  conversation_id: any;
  appointment_id_rcv: any;
  conversation_id_rcv: any;

  constructor(private httpClient: HttpClient,
              private getData: APIService,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService) {
  }

  ngOnInit(): any {
    this.peerID = this.route.snapshot.params.peer_id;
    this.msisdn = this.route.snapshot.params.msisdn;
    this.subsState = null;
    this.volumeState = 'active';
    this.mistaken_drop = null;
    this.preventRefresh();
    this.OV = new OpenVidu();
    this.session = this.OV.initSession();
    this.joinSession();

  }

  ngOnDestroy(): any {
  }

  private joinSession(): any {
    console.log(this.peerID);
    // On every new Stream received...
    this.session.on('streamCreated', (event: StreamEvent) => {
      const subscriber: Subscriber = this.session.subscribe(event.stream, undefined);
      this.subscribers.push(subscriber);
      this.subsState = 'active';
      this.stopRing();
      if (this.timer) {
        this.timer.unsubscribe();
      }
    });

    // On every Stream destroyed...
    this.session.on('streamDestroyed', (event: StreamEvent) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream.streamManager);
      this.subsState = null;
      this.leaveSession();
    });

    // Generate Session, get token and publish local stream
    this.startCall();
  }

  private startCall(): any {
    const peerID = this.peerID;
    this.getData.startCall(this.peerID, this.msisdn).subscribe((datas: any) => {
        this.myToken = datas.data.token;
        if (peerID === null) {
          this.leaveSession();
        }
        this.session.connect(this.myToken, {clientData: 'Healthplus'})
          .then(() => {
            const publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true,     // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true,     // Whether you want to start publishing with your video enabled or not
              resolution: '640x480',  // The resolution of your video
              frameRate: 30,          // The frame rate of your video
              insertMode: 'APPEND'   // How the video is inserted in the target element 'video-container'
            });

            if (this.session.capabilities.publish) {
              this.session.publish(publisher).then((result: any) => {
                console.log('Published');
              }).catch((error: any) => {
                console.log('Not Published');
              });
            } else {
              alert('Unable to publish');
              this.leaveSession();
            }

            this.mainStreamManager = publisher;
            this.publisher = publisher;
          })
          .catch(error => {
            console.log('There was an error connecting to the session:', error.code, error.message);
          });
      },
      error => {
        alert('Something went wrong. Please try again!');
        this.leaveSession();
      });
  }

  private deleteSubscriber(streamManager: StreamManager): void {
    const index = this.subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  private leaveSession(): any {
    window.removeEventListener('beforeunload', this.preventRefresh, true);
    const peerID = this.peerID;

    this.getData.userEndCall(this.peerID, this.msisdn).subscribe((response) => {
        if (this.session) {
          this.session.disconnect();
        }

        // Empty all properties...
        this.subscribers = [];
        delete this.publisher;
        delete this.session;
        delete this.OV;
        window.location.replace('http://healthplus.life');
      },
      error => {
        this.alertService.error(error.error.message, {autoClose: true});
        window.location.replace('http://healthplus.life');
      });
  }

  private mute(): any {
    this.publisher.publishAudio(false);
    this.volumeState = 'mute';
  }

  private unmute(): any {
    this.publisher.publishAudio(true);
    this.volumeState = 'active';
  }

  playRing(): any {
    this.ring = new Audio('assets/r.mp3');
    this.ring.loop = true;
    this.ring.play();
  }

  stopRing(): any {
    if (this.ring) {
      this.ring.pause();
    }
  }

  preventRefresh(): any {
    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    });
  }
}

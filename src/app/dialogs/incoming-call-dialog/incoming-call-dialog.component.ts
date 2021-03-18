import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '../../services/api/api.service';
import {CommonService} from '../../services/common.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-incoming-call-dialog',
  templateUrl: './incoming-call-dialog.component.html',
  styleUrls: ['./incoming-call-dialog.component.css']
})
export class IncomingCallDialogComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private getData: APIService,
              private common: CommonService,
              private router: Router,
              private alertService: AlertService) {
  }

  @Input() callerName;

  ngOnInit(): void {
    this.common.setNgbActiveModal(this.activeModal);
  }

  answerCall(): any {
    this.activeModal.close();
    this.common.stopRing();
    // this.common.getIncomingCallSubscription().unsubscribe();
    this.router.navigate(['dashboard/video-call-window']);
  }

  declineCall(): any {
    const peerID = localStorage.getItem('peer_id');
    this.getData.endCall(peerID).subscribe((response) => {
        console.log(response);
        this.activeModal.close();
        this.common.stopRing();
      },
      error => {
        console.log(error.status);
        this.alertService.error(error.error.message, {autoClose: true});
      });
  }

}

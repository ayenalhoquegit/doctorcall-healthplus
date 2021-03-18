import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {interval, Subscription} from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IncomingCallDialogComponent} from '../../dialogs/incoming-call-dialog/incoming-call-dialog.component';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';
import {Title} from '@angular/platform-browser';

declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentTab: any;
  url = '';
  tree: UrlTree;
  primary: UrlSegmentGroup;
  spinnerName: string;

  ringing: any;
  subscription: Subscription;
  titleSubscription1: Subscription;
  titleSubscription2: Subscription;

  constructor(private common: CommonService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal,
              private getData: APIService,
              private alertService: AlertService,
              private titleService: Title) {

    this.common.setSpinner(this.spinner);
    this.spinnerName = 'main-spinner';
  }

  ngOnInit(): void {
    localStorage.removeItem('peer_id');
    this.common.showSpinner(this.spinnerName);
    this.tree = this.router.parseUrl(this.router.url);
    this.primary = this.tree.root.children[PRIMARY_OUTLET];
    const primarySegments: UrlSegment[] = this.primary.segments;

    if (primarySegments[1]) {
      this.currentTab = primarySegments[1].path;
    } else {
      this.currentTab = 'toggle-status';
    }

    this.common.hideSpinner(this.spinnerName);
    localStorage.removeItem('ringing');
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.callPolling());
    this.common.setIncomingCallSubscription(this.subscription);
  }

  callPolling(): any {
    this.getData.callPolling().subscribe((response) => {
        console.log(response.data.isAnyCallRunning);
        this.ringing = localStorage.getItem('ringing');
        if (response.data.isAnyCallRunning && this.ringing === null) {
          localStorage.setItem('peer_id', response.data.peerId);
          localStorage.setItem('peer_id_video_call', response.data.peerId);
          localStorage.setItem('ringing', 'value');

          this.open(response.data.participant);
          this.common.playRing();

          const source1 = interval(1000);
          const source2 = interval(2000);

          this.titleSubscription1 = source1.subscribe(val => this.changeTitle(response.data.participant));
          this.titleSubscription2 = source2.subscribe(val => this.changeTitle2('Doctor || Video Call'));

        } else if (!response.data.isAnyCallRunning) {
          if (this.common.getNgbActiveModal()) {
            this.common.getNgbActiveModal().close();
            this.common.stopRing();
          }

          localStorage.removeItem('ringing');
          localStorage.removeItem('peer_id');

          if (this.titleSubscription1 && this.titleSubscription2) {
            this.titleSubscription1.unsubscribe();
            this.titleSubscription2.unsubscribe();
          }

          this.titleService.setTitle('Doctor || Video Call');
        }
      },
      error => {
        console.log(error.status);
        if (error.status === 401) {
          this.subscription.unsubscribe();
        }
      });
  }

  changeTitle(message): any {
    this.titleService.setTitle('Incoming Call ' + message);
  }

  changeTitle2(message): any {
    this.titleService.setTitle(message);
  }

  open(callerName): any {
    const openedModal = this.modalService.open(IncomingCallDialogComponent, {backdrop: 'static', centered: true});
    openedModal.result.then((result) => {
    }, (reason) => {
      if (reason === ModalDismissReasons.ESC) {
        localStorage.removeItem('ringing');
        this.common.stopRing();
      }
    });
    openedModal.componentInstance.callerName = callerName;
  }

  logout(): any {
    this.getData.logout().subscribe((response: any) => {
        this.common.logout();
        this.common.stopRing();
        this.subscription.unsubscribe();
      },
      error => {
        console.log(error.status);
        this.alertService.error(error.error.message, {autoClose: true});
      });
  }

}

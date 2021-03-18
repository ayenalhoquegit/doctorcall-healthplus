import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private spinner: NgxSpinnerService;
  private appointmentIDCallRcv: any;
  private conversationIDCallRcv: any;
  private callModal: NgbActiveModal;
  private incomingCallSubscription: Subscription;
  private ringTone: any;

  constructor(private router: Router) {
  }

  logout(): any {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user_token');
    this.router.navigate(['']);
  }

  setSpinner(spinner: NgxSpinnerService): any {
    this.spinner = spinner;
  }

  showSpinner(name: string): any {
    this.spinner.show(name);
  }

  hideSpinner(name: string): any {
    this.spinner.hide(name);
  }

  setAppointmentIDCallRcv(appointmentID): any {
    this.appointmentIDCallRcv = appointmentID;
  }

  getAppointmentIDCallRcv(): any {
    return this.appointmentIDCallRcv;
  }

  setConversationIDCallRcv(conversationID): any {
    this.conversationIDCallRcv = conversationID;
  }

  getConversationIDCallRcv(): any {
    return this.conversationIDCallRcv;
  }

  setNgbActiveModal(modal: NgbActiveModal): any {
    this.callModal = modal;
  }

  getNgbActiveModal(): any {
    return this.callModal;
  }

  setIncomingCallSubscription(subscription: Subscription): any {
    this.incomingCallSubscription = subscription;
  }

  getIncomingCallSubscription(): any {
    return this.incomingCallSubscription;
  }

  playRing(): any {
    this.ringTone = new Audio('assets/incoming-call.mp3');
    this.ringTone.loop = true;
    const promise = this.ringTone.play();
    if (promise !== undefined) {
      promise.then(() => {
        console.log(promise);
      })
        .catch(error => {
          console.log(promise);
        });
    }
  }

  stopRing(): any {
    if (this.ringTone) {
      this.ringTone.pause();
    }
  }
}

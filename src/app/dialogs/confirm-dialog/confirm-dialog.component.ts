import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {APIService} from '../../services/api/api.service';
import {CommonService} from '../../services/common.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-confirm-component',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  spinnerName: string;

  constructor(public activeModal: NgbActiveModal,
              private getData: APIService,
              private common: CommonService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
    this.spinnerName = 'modal-spinner';
    this.common.setSpinner(this.spinner);
  }

  ngOnInit(): void {
  }

  appointmentServed(): any {
    console.log(localStorage.getItem('call_ended'));
    this.common.showSpinner(this.spinnerName);
    this.getData.appointmentServedUpdate(localStorage.getItem('call_ended')).subscribe((response) => {
        this.common.hideSpinner(this.spinnerName);
        localStorage.removeItem('call_ended');
        this.alertService.success('Successfully Updated!');
        this.activeModal.close();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      },
      error => {
        console.log(error);
        this.common.hideSpinner(this.spinnerName);
        this.alertService.error('Update Failed. Try Again!');
        this.activeModal.close();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      });
  }

  appointmentNotServed(): any {
    localStorage.removeItem('call_ended');
  }
}

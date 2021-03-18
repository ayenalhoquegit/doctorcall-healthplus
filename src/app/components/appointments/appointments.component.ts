import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';
import {Appointments} from '../../model/appointments';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CommonService} from '../../services/common.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointments;
  spinnerName: string;
  showModal: any;
  noAppointment: any;
  availability: any;
  status: any;

  constructor(private getData: APIService,
              private alertService: AlertService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private common: CommonService,
              private modalService: NgbModal) {
    this.common.setSpinner(this.spinner);
    this.spinnerName = 'main-spinner';
  }

  ngOnInit(): void {
    localStorage.removeItem('appointmentID_video_call_rcv');
    localStorage.removeItem('conversationID_video_call_rcv');

    this.showModal = localStorage.getItem('call_ended');
    if (this.showModal !== null) {
      this.open();
    }
    this.appointments = null;
    this.getAvailability();
  }

  convertDate(date): any {
    return moment(date).format('MMMM Do YYYY');
  }

  gotoVideoCallWindow(appointmentID): any {
    localStorage.removeItem('appointmentID_video_call');
    localStorage.setItem('appointmentID_video_call', appointmentID);
    this.common.getIncomingCallSubscription().unsubscribe();
    this.router.navigate(['dashboard/video-call-window']);
  }

  getAvailability(): any {
    this.common.showSpinner('main-spinner');
    this.getData.getAvailabilityInfo().subscribe((response: any) => {
        console.log(response);
        this.common.hideSpinner('main-spinner');
        this.availability = response.data.status;
        if (response.data.status) {
          this.status = 'Active';
        } else {
          this.status = 'Inactive';
        }
      },
      error => {
        this.common.hideSpinner('main-spinner');
        console.log(error.error);
        this.alertService.error(error.error.message, {autoClose: true});
      });
  }

  changeAvailability(): any {
    this.common.showSpinner('main-spinner');
    this.getData.changeAvailabilityInfo().subscribe((response: any) => {
        console.log(response);
        this.common.hideSpinner('main-spinner');
        this.availability = response.data.status;
        if (response.data.status === 1) {
          this.status = 'Active';
        } else {
          this.status = 'Inactive';
        }
      },
      error => {
        this.common.hideSpinner('main-spinner');
        console.log(error.error);
        this.alertService.error(error.error.message, {autoClose: true});
      });
  }

  open(): any {
    this.modalService.open(ConfirmDialogComponent, {backdrop: 'static', centered: true}).result.then((result) => {
    }, (reason) => {
      if (reason === ModalDismissReasons.ESC) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CommonService} from '../../services/common.service';

declare let $: any;

@Component({
  selector: 'app-prescribe',
  templateUrl: './prescribe.component.html',
  styleUrls: ['./prescribe.component.css']
})

export class PrescribeComponent implements OnInit {
  prescription: any;
  appointmentID: any;
  spinnerName: string;

  constructor(private getData: APIService,
              private alertService: AlertService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private common: CommonService) {
    this.common.setSpinner(this.spinner);
    this.spinnerName = 'main-spinner';
  }

  ngOnInit(): void {
    this.prescription = '';
    this.common.showSpinner(this.spinnerName);

    $('.medicine').select2();

    $('.medicine').on('change', () => {
      this.updatePrescription($('.medicine').val());
    });

    $(document).on('keyup', '.select2-search__field', () => {
      this.getMedicine($('.select2-search__field').val());
    });

    this.appointmentID = localStorage.getItem('appointmentID_prescription');
    this.common.hideSpinner(this.spinnerName);
  }

  getMedicine(values): any {
    this.common.showSpinner(this.spinnerName);
    this.getData.getMedicine(values).subscribe((response) => {
        this.common.hideSpinner(this.spinnerName);
        response.data.products.forEach(value => {
          const data = {
            id: value.name + ' ' + value.strength,
            text: value.name + ' ' + value.strength
          };
          const newOption = new Option(data.text, data.id, true, false);
          $('.medicine').append(newOption);
        });
      },
      error => {
        this.common.hideSpinner(this.spinnerName);
        console.log(error);
        this.alertService.error('Could not find medicine. Try again!', {autoClose: true});
      });
  }

  sendPrescription(): any {
    this.common.showSpinner(this.spinnerName);
    this.getData.sendPrescription(this.prescriptionData(), this.appointmentID).subscribe((response) => {
        this.common.hideSpinner(this.spinnerName);
        this.alertService.success('Prescription Sent Successfully.');
        $('.prescription').val('');
        setTimeout(() => {
          this.router.navigate(['dashboard/appointments']);
        }, 3000);
        console.log(response);
      },
      error => {
        this.common.hideSpinner(this.spinnerName);
        this.alertService.error('Prescription Send Failed. Try Again!');
        console.log(error);
      });
  }

  cancel(): any {
    this.router.navigate(['dashboard/appointments']);
  }

  updatePrescription(medicine): any {
    this.prescription = $('.prescription').val();
    this.prescription += '' + medicine + '\n';
  }

  private prescriptionData(): any {
    return {
      body: $('.prescription').val(),
    };
  }

  logout(): any {
    this.common.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import {APIService} from '../../../services/api/api.service';
import {AlertService} from '../../../services/alert/alert.service';
import {Router} from '@angular/router';
import {Availabilities} from '../../../model/availabilities';
import {CommonService} from '../../../services/common.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-update-availability',
  templateUrl: './update-availability.component.html',
  styleUrls: ['./update-availability.component.css']
})
export class UpdateAvailabilityComponent implements OnInit {
  slot: Availabilities;
  oldStartTime: any;
  oldEndTime: any;
  spinnerName: string;

  constructor(private getData: APIService,
              private alertService: AlertService,
              private router: Router, private common: CommonService,
              private spinner: NgxSpinnerService) {
    this.common.setSpinner(this.spinner);
    this.spinnerName = 'main-spinner';
  }

  ngOnInit(): void {
    this.slot = JSON.parse(localStorage.getItem('slot_details'));
    this.oldStartTime = this.slot.startTime;
    this.oldEndTime = this.slot.endTime;
    console.log(this.slot);
  }

  cancelUpdate(): any {
    this.router.navigate(['dashboard/availability']);
  }

  updateSlot(startTime, endTime, status): any {
    if (confirm('Are you sure? ')) {
      this.common.showSpinner('main-spinner');
      this.getData.updateSlot(this.slotData(startTime, endTime, status)).subscribe((response) => {
          console.log(response);
          this.common.hideSpinner('main-spinner');
          this.alertService.success('Slot Updated Successfully!');
          setTimeout(() => {
            this.router.navigate(['dashboard/availability']);
          }, 3000);
        },
        error => {
          this.common.hideSpinner('main-spinner');
          this.alertService.error('Slot Updated Failed. Try Again!');
          console.log(error);
        });
    }
  }

  private slotData(startTime, endTime, status): any {
    return {
      id: this.slot.id,
      startTime,
      endTime,
      isActive: status,
    };
  }

  logout(): any {
    this.common.logout();
  }
}

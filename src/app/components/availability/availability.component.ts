import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';
import {Availabilities} from '../../model/availabilities';
import {Router} from '@angular/router';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  availabilities: Availabilities;
  noAvailability: any;

  constructor(private getData: APIService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.availabilities = null;
    this.getAvailabilities();
  }

  getAvailabilities(): any {
    this.getData.getAvailabilities().subscribe((response) => {
        this.availabilities = response.data.availabilities;
      },
      error => {
        console.log(error);
        if (error.status === 404) {
          this.noAvailability = 'No Slots Found!';
        } else {
          this.noAvailability = 'Something went wrong! Try again!.';
        }
      });
  }

  getStatus(status): string {
    if (status) {
      return '<p class="text-success">ENABLED</p>';
    } else {
      return '<p class="text-danger">DISABLED</p>';
    }
  }

  gotoUpdateAvailability(slotDetails): any {
    localStorage.removeItem('slot_details');
    localStorage.setItem('slot_details', JSON.stringify(slotDetails));
    this.router.navigate(['dashboard/update-availability']);
  }
}

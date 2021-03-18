import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';
import {CallLogs} from '../../model/call-logs';
import * as moment from 'moment';
import {CommonService} from '../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-calllogs',
  templateUrl: './calllogs.component.html',
  styleUrls: ['./calllogs.component.css']
})
export class CalllogsComponent implements OnInit {
  callLogs: CallLogs;
  noCallLogs: any;

  constructor(private getData: APIService,
              private alertService: AlertService,
              private common: CommonService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.callLogs = null;
    this.getCallLogs();
  }

  convertDate(date): any {
    return moment.utc(date).format('MMMM Do, h:mm:ss a');
  }

  getCallLogs(): any {
    this.getData.getCallLogs().subscribe((response) => {
        this.callLogs = response.data.logs;
      },
      error => {
        console.log(error);
        if (error.status === 404) {
          this.noCallLogs = 'No Call Logs Found!';
        } else {
          this.noCallLogs = 'Something Went wrong. Try Again!';
        }
      });
  }

  gotoVideoCallWindow(appointmentID): any {
    localStorage.removeItem('appointmentID_video_call');
    localStorage.setItem('appointmentID_video_call', appointmentID);
    this.common.getIncomingCallSubscription().unsubscribe();
    this.router.navigate(['dashboard/video-call-window']);
  }

}

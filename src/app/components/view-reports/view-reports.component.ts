import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api/api.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert/alert.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {
  reportFiles: File[] = [];
  fileUrl: string[] = [];
  failedMessage: string;
  successMessage: string;
  uploadedFiles: [];
  newUploadedFiles: [];
  imageExtension = [];
  otherExtension = [];

  constructor(private getData: APIService,
              private alertService: AlertService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private common: CommonService) {
  }

  ngOnInit(): void {
    this.imageExtension = ['jpg', 'png', 'jpeg', 'bmp'];
    this.otherExtension = ['pptx', 'doc', 'docx', 'pdf', 'ppt'];
    this.getMedicine();
  }

  getMedicine(): any {
    this.spinner.show();
    const appointmentID = localStorage.getItem('report_appointment_id');
    this.getData.getReports(appointmentID).subscribe((response) => {
        this.uploadedFiles = response.data.documents;
        console.log(response);
      },
      error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  logout(): any {
    this.common.logout();
  }

}

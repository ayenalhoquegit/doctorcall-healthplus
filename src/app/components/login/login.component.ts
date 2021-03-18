import {Component, OnInit} from '@angular/core';
import {APIService} from '../../services/api/api.service';
import {AlertService} from '../../services/alert/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  spinner: boolean;
  returnUrl: string;

  constructor(
    private getData: APIService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute) {

    this.username = '';
    this.password = '';
    this.spinner = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_token')) {
      this.router.navigate(['dashboard']);
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }

  public doLogin(): void {
    this.spinner = true;
    this.alertService.clear();

    this.getData.checkCredentials(this.loginData()).subscribe((response: any) => {
        localStorage.setItem('user_token', response.data.token);
        this.router.navigate([this.returnUrl]);
        this.spinner = false;
      },
      error => {
        this.spinner = false;
        console.log(error.error);
        this.alertService.error(error.error.message, {autoClose: true});
      });
  }

  private loginData(): any {
    return {
      username: this.username,
      password: this.password,
    };
  }

}

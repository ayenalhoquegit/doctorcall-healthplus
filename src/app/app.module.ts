import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ApiEndpoints} from './services/api/api-endpoints';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {PrescribeComponent} from './components/prescribe/prescribe.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {UpdateAvailabilityComponent} from './components/availability/update-availability/update-availability.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import {VideoCallWindowComponent} from './components/video-call-window/video-call-window.component';
import {SharedModuleModule} from './shared-module/shared-module.module';
import {OpenViduVideoComponent} from './components/video-call-window/ov-video.component';
import {UserVideoComponent} from './components/video-call-window/user-video.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';
import {IncomingCallDialogComponent} from './dialogs/incoming-call-dialog/incoming-call-dialog.component';
import {ViewReportsComponent} from './components/view-reports/view-reports.component';
import {UserVideoCallWindowComponent} from './components/video-call-window/user-call.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrescribeComponent,
    UpdateAvailabilityComponent,
    VideoCallWindowComponent,
    OpenViduVideoComponent,
    UserVideoComponent,
    ConfirmDialogComponent,
    IncomingCallDialogComponent,
    ViewReportsComponent,
    UserVideoCallWindowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SharedModuleModule,
    NgbModule,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    IncomingCallDialogComponent
  ],
  providers: [
    ApiEndpoints,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

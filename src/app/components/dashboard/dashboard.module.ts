import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {AppointmentsComponent} from '../appointments/appointments.component';
import {AvailabilityComponent} from '../availability/availability.component';
import {CalllogsComponent} from '../calllogs/calllogs.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModuleModule} from '../../shared-module/shared-module.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentsComponent,
    AvailabilityComponent,
    CalllogsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
    SharedModuleModule
  ]
})
export class DashboardModule {
}

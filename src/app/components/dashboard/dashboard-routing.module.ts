import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {AppointmentsComponent} from '../appointments/appointments.component';
import {AvailabilityComponent} from '../availability/availability.component';
import {CalllogsComponent} from '../calllogs/calllogs.component';
import {ViewReportsComponent} from '../view-reports/view-reports.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'appointments',
        component: AppointmentsComponent
      },
      {
        path: 'availability',
        component: AvailabilityComponent
      },
      {
        path: 'call-logs',
        component: CalllogsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}

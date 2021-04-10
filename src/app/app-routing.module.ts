import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './services/guard/auth.guard';
import {PrescribeComponent} from './components/prescribe/prescribe.component';
import {UpdateAvailabilityComponent} from './components/availability/update-availability/update-availability.component';
import {VideoCallWindowComponent} from './components/video-call-window/video-call-window.component';
import {ViewReportsComponent} from './components/view-reports/view-reports.component';
import {UserCallWindow} from "./components/user-call/video-call-window.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/prescribe',
    component: PrescribeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/view-reports',
    component: ViewReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/update-availability',
    component: UpdateAvailabilityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/video-call-window',
    component: VideoCallWindowComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-call-window?msisdn=:msisdn&peer_id=:peer_id',
    component: UserCallWindow,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

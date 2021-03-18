import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ApiEndpoints} from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient, private endPoints: ApiEndpoints) {
  }

  public checkCredentials(loginParam): any {
    return this.http.post(this.endPoints.doctorLogin, loginParam).pipe(
      catchError(this.handleError),
    );
  }

  public logout(): any {
    return this.http.post(this.endPoints.doctorLogout, '').pipe(
      catchError(this.handleError),
    );
  }

  public getAvailabilityInfo(): any {
    return this.http.get(this.endPoints.getAvailability).pipe(
      catchError(this.handleError),
    );
  }

  public changeAvailabilityInfo(): any {
    return this.http.post(this.endPoints.changeAvailability, '').pipe(
      catchError(this.handleError),
    );
  }

  public callPolling(): any {
    return this.http.get(this.endPoints.callPolling).pipe(
      catchError(this.handleError),
    );
  }

  public endCall(peerID): any {
    return this.http.delete(this.endPoints.endCallDoctor + peerID).pipe(
      catchError(this.handleError),
    );
  }

  public getReceiveToken(peerID): any {
    return this.http.post(this.endPoints.receiveCall + peerID, '').pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  public getAvailabilities(): any {
    /*return this.http.get<Availabilities[]>(this.endPoints.availabilities).pipe(
      catchError(this.handleError),
    );*/
  }

  public getCallLogs(): any {
    /*return this.http.get<CallLogs[]>(this.endPoints.callLogs).pipe(
      catchError(this.handleError),
    );*/
  }

  public cancelAppointment(appointmentID): any {
    return this.http.delete(this.endPoints.cancelAppointment + appointmentID).pipe(
      catchError(this.handleError),
    );
  }

  public getMedicine(param): any {
    return this.http.get(this.endPoints.medicineList + '?q=' + param).pipe(
      catchError(this.handleError),
    );
  }

  public updateSlot(param): any {
    return this.http.put(this.endPoints.updateAvailabilities, param).pipe(
      catchError(this.handleError),
    );
  }

  public sendPrescription(param, appointmentID): any {
    return this.http.post(this.endPoints.prescription + appointmentID + '/prescription', param).pipe(
      catchError(this.handleError),
    );
  }

  /*public getToken(appointmentID): any {
    return this.http.post(this.endPoints.videoCall + appointmentID + '/conversations', '').pipe(
      catchError(this.handleError),
    );
  }
*/
  public appointmentServedUpdate(appointmentID): any {
    return this.http.post(this.endPoints.appointmentServedUpdate + appointmentID + '/served', '').pipe(
      catchError(this.handleError),
    );
  }


  public hangUpCall(appointmentID, conversationID): any {
    return this.http.post(this.endPoints.hangupCall + appointmentID + '/conversations/' + conversationID + '/hangup', '').pipe(
      catchError(this.handleError),
    );
  }

  public startTimer(appointmentID, conversationID): any {
    return this.http.post(this.endPoints.callTimer + appointmentID + '/conversations/' + conversationID + '/start', '').pipe(
      catchError(this.handleError),
    );
  }

  public stopTimer(appointmentID, conversationID): any {
    return this.http.post(this.endPoints.callTimer + appointmentID + '/conversations/' + conversationID + '/end', '').pipe(
      catchError(this.handleError),
    );
  }

  public getReports(appointmentID): any {
    return this.http.get(this.endPoints.getFiles + '/' + appointmentID + '/documents').pipe(
      catchError(this.handleError),
    );
  }
}

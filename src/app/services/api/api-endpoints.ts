export class ApiEndpoints {
  // private baseUrl = 'http://45.114.85.19:8081/'; // dev http
  // private baseUrl = 'https://patientservicebd.com:8444/'; // dev https
  // private baseUrl = 'http://healthplus.life:8081/'; // dev http
  // private baseUrl = 'https://healthplus.life:8443/'; // live https
 // private baseUrl = 'https://healthplus.life:8081/'; // dev http
 // private baseUrl = 'http://192.168.7.234:8080/'; // live https5
  // private baseUrl = 'http://45.114.85.19:8081/'; // live https5
  private baseUrl = 'https://patientservicebd.com:8444/'; // dev https5


  public readonly doctorLogin = this.baseUrl + 'v4/call-service/providers/login/';
  public readonly doctorLogout = this.baseUrl + 'v4/call-service/providers/logout/';
  public readonly changeAvailability = this.baseUrl + 'v4/call-service/providers/roasters/status/toggle/';
  public readonly getAvailability = this.baseUrl + 'v4/call-service/providers/roasters/info/me/';
  public readonly callPolling = this.baseUrl + 'v4/call-service/providers/route/peer/ringing/';
  public readonly endCallDoctor = this.baseUrl + 'v4/call-service/providers/route/peer/';
  public readonly receiveCall = this.baseUrl + 'v4/call-service/providers/route/token/';

  public  readonly  startCall = this.baseUrl + 'v4/call-service/participants/route/token/';
  public  readonly  endCall = this.baseUrl + 'v4/call-service/participants/route/peer/';


  public readonly appointments = this.baseUrl + 'v3/roasters/appointments/';
  public readonly availabilities = this.baseUrl + 'v3/roasters/appointments/slots/availabilities/';
  public readonly callLogs = this.baseUrl + 'v3/roasters/logs/calls/';
  public readonly cancelAppointment = this.baseUrl + 'v3/roasters/appointments/';
  public readonly updateAvailabilities = this.baseUrl + 'v3/roasters/appointments/slots/availabilities/';
  public readonly medicineList = this.baseUrl + 'v1.0.0/products/autocomplete';
  public readonly prescription = this.baseUrl + 'v3/roasters/appointments/';
  public readonly videoCall = this.baseUrl + 'v3/roasters/appointments/';
  public readonly appointmentServedUpdate = this.baseUrl + 'v3/roasters/appointments/';
  public readonly hangupCall = this.baseUrl + 'v3/roasters/appointments/';
  public readonly callTimer = this.baseUrl + 'v3/roasters/appointments/';
  public readonly getFiles = this.baseUrl + 'v3/roasters/appointments';
}

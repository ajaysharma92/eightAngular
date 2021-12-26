import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Smartphone } from './smartphone';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Employeedata, User } from './employees';
import { map, catchError, retry } from 'rxjs/operators';
 
const localUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string = 'https://api.github.com/';
  private apiDataUrl = 'http://dummy.restapiexample.com/api/v1/employees';
  private countryList = '../assets/data/countrylist.json';
  private countryList2 = 'https://restcountries.eu/rest/v2/all';
  private messageService = new BehaviorSubject<string>('This message from API Services');
  private readonly externalApi = 'https://61bdb64f2a1dd4001708a101.mockapi.io';
  subject$ = new BehaviorSubject(false);

  currentMessage = this.messageService.asObservable();

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getSmartPhone(): Observable<Smartphone>{
    return this.httpClient.get<Smartphone>(`${localUrl}/smartphone/`).pipe(retry(1), catchError(this.handleError))
  }
  public getDeviceDetails(id: string): Observable<Smartphone>{
    return this.httpClient.get<Smartphone>(`${localUrl}/smartphone/${id}`).pipe(retry(1), catchError(this.handleError))
  }

  getEmpData(): Observable<Employeedata>{
    return this.httpClient.get<Employeedata>(`${this.externalApi}/empdata`).pipe(retry(1), catchError(this.handleError))
  }
  
  getEmployee(empid: number): Observable<Employeedata>{
    return this.httpClient.get<Employeedata>(`${this.externalApi}/empdata/${empid}`).pipe(retry(1), catchError(this.handleError))
  }

  deleteEmpRecord(empid: number): Observable<Employeedata>{
    return this.httpClient.delete<Employeedata>(`${this.externalApi}/empdata/${empid}`).pipe(catchError(this.handleError))
  }

  createUserData(employee):Observable<User>{
    return this.httpClient.post<User>(`${localUrl}/empdata/`, JSON.stringify(employee), this.httpOptions).pipe(catchError(this.handleError))
  }

  getRepos(userName:string):Observable<any>{
    return this.httpClient.get(`${this.baseUrl}users/${userName}/repos`)
  }

  getCountryList():Observable<any>{
    return this.httpClient.get(this.countryList);
  }

  getCountryList2():Observable<any>{
    return this.httpClient.get(`${localUrl}/countryList/`).pipe(retry(1), catchError(this.handleError));
    //return this.httpClient.get(`${this.externalApi}/country/`).pipe(retry(1), catchError(this.handleError));
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}

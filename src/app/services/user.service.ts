import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = environment.baseURL;

  getAllEmailRoute = 'email/';

  constructor(private http: HttpClient) { }

  /**
   * To get All Email/
   */
  getAllEmail(): Observable<any> {
   return this.http.get(this.baseURL + this.getAllEmailRoute);
  }

  /**
   * To add new email
   */
  addNewEmail(emailParams): Observable<any> {
    return this.http.post(this.baseURL + this.getAllEmailRoute, emailParams);
  }

  /**
   * To update existing email Id
   */
  updateEmail(tableEmailId): Observable<any> {
    return this.http.put(this.baseURL + this.getAllEmailRoute, tableEmailId);
  }

  /**
   * To delete existing email Id
   */
  deleteEmail(tableEmailId): Observable<any> {
    return this.http.delete(this.baseURL + this.getAllEmailRoute, tableEmailId);
  }

}





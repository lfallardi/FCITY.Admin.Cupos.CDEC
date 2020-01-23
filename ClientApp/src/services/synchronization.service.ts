
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Synchronization } from 'src/app/client/model/synchronization';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class SynchronizationService {

  constructor(private http: HttpClient) {

  }

  getLastDateOfSynchronization( ): Observable<Synchronization> {
     return this.http.get<Synchronization>(environment.userServer + '/api/Synchronization/');
  }
}

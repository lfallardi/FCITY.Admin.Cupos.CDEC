import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/client/model/response/loginResponse';
import { InternalUserSearchFilter } from 'src/app/internalUser/model/internalUserSearchFilter';
import { InternalUser } from 'src/app/internalUser/model/internalUser';
import { CreateInternalUserRequest } from 'src/app/internalUser/model/request/createInternalUserRequest';
import { UpdateInternalUserRequest } from 'src/app/internalUser/model/request/updateInternalUserRequest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};


@Injectable({
  providedIn: 'root'
})
export class InternalUserService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email: email, password: password };
    return this.http.post<LoginResponse>(environment.userServer +
                                         '/api/InternalUser/A1ED55A6169B8AC16388A81F89C3E59B1F9F8DC6A3BFD38F483598A899',
                                         body);
  }

  loginAD(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.userServer + '/api/InternalUser/login-ad', null);
  }

  getAll(): Observable<InternalUser[]> {

    return this.http.get<InternalUser[]>(environment.userServer + '/api/InternalUser');

  }


  getUsersFilteredCount(filter: InternalUserSearchFilter): Observable<number> {

    return this.http.get<number>(environment.userServer + '/api/InternalUser/count?firstName=' + filter.firstName
      + `&lastName=` + filter.lastName
      + `&email=` + filter.email
      + `&rol=` + filter.role
    );

  }


  getFilteredUsers(pageSize: number, pageIndex: number, filter: InternalUserSearchFilter): Observable<InternalUser[]> {

    return this.http.get<InternalUser[]>(environment.userServer + `/api/InternalUser/search?Email=` + filter.firstName
      + `&lastName=` + filter.lastName
      + `&email=` + filter.email
      + `&role=` + filter.role
      + `&pageSize=` + pageSize
      + `&pageIndex=` + pageIndex);

  }

  createNewUser(request: CreateInternalUserRequest) {
    return this.http.post(environment.userServer + '/api/InternalUser/', request);
  }

  updateRole(request: UpdateInternalUserRequest) {
    return this.http.put(environment.userServer + '/api/InternalUser/', request);
  }

  delete(keys: string) {
    return this.http.delete(environment.userServer + '/api/InternalUser?key=' + keys);
  }
}

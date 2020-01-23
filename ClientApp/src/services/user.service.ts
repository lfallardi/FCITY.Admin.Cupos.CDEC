import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/model/barrel';
import { Observable } from 'rxjs';
import { UserDetail } from 'src/app/client/model/userDetail';
import { UserSearchFilter } from 'src/app/client/model/userSearchFilter';
import { NewUserRequest } from 'src/app/client/model/request/newUserRequest';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  getFilteredUsers(pageSize: number, pageIndex: number, filter: UserSearchFilter): Observable<User[]> {

    return this.http.get<User[]>(environment.userServer + `/api/User/search?Email=` + filter.email
      + `&province=` + filter.province
      + `&firstName=` + filter.firstName
      + `&lastName=` + filter.lastName
      + `&dni=` + filter.dni
      + `&status=` + filter.status
      + `&registrationDateFrom=` + filter.registrationDateFrom
      + `&registrationDateTo=` + filter.registrationDateTo
      + `&dateOfBirthFrom=` + filter.dateOfBirthFrom
      + `&dateOfBirthTo=` + filter.dateOfBirthTo
      + `&pageSize=` + pageSize
      + `&pageIndex=` + pageIndex);

  }

  getUsersFilteredCount(filter: UserSearchFilter): Observable<number> {

    return this.http.get<number>(environment.userServer + '/api/User/count?Email=' + filter.email
      + `&province=` + filter.province
      + `&firstName=` + filter.firstName
      + `&lastName=` + filter.lastName
      + `&dni=` + filter.dni
      + `&status=` + filter.status
      + `&registrationDateFrom=` + filter.registrationDateFrom
      + `&registrationDateTo=` + filter.registrationDateTo
      + `&dateOfBirthFrom=` + filter.dateOfBirthFrom
      + `&dateOfBirthTo=` + filter.dateOfBirthTo);

  }

  getUserDetailByKey(key: string): Observable<UserDetail> {
    return this.http.get<UserDetail>(environment.userServer + '/api/User/get-by-key/' + key);

  }

  resetPassword(keys: string[]) {
    const body = { keys: keys };
    return this.http.post(environment.userServer + '/api/User/reset-pwd', body);

  }

  createNewUser(request: NewUserRequest) {
    return this.http.post(environment.userServer + '/api/User/', request);
  }

  updateUser(user: UserDetail) {
    return this.http.put(environment.userServer + '/api/User', user);
  }

  deleteUsersByKeys(keys: string[]) {
    const body = { Keys: keys };
    return this.http.post(environment.userServer + '/api/User/delete-users', body);
  }

  updateUsersStatesByKeys(keys: string[], newStatus: string) {
    const body = { Keys: keys , Status : newStatus };
    return this.http.post(environment.userServer + '/api/User/update-users-status', body);
  }

  checkEmail(key: string) {
    const body = { key: key };
    return this.http.post(environment.userServer + '/api/User/check-email', body);

  }
}

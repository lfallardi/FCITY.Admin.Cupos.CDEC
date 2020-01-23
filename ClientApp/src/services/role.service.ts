import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Role } from 'src/app/internalUser/model/role';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScreenElement } from 'src/app/internalUser/model/screenElement';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {

  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(environment.userServer + '/api/Role');
  }

  getScreenElementsByRoleCode(code: string): Observable<ScreenElement[]> {
    return this.http.get<ScreenElement[]>(environment.userServer + '/api/Role/getScreenElementsByRoleCode/' + code);
  }

  edit(roleCode: string, enabledPermissions: string[], disabledPermissions: string[]) {
    const body = {
      RoleCode: roleCode,
      ElementsToRemove: disabledPermissions,
      ElementsToAdd: enabledPermissions
    };
    return this.http.post(environment.userServer + '/api/Role/screenElements', body);
  }

}

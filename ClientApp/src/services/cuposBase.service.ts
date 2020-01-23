import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CuposDetail } from 'src/app/cupos/model/CuposDetail';
import { Cupos } from 'src/model/cupos';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class CuposBaseService {

    constructor(private http: HttpClient) {
    }

    getCuposBase(): Observable<Cupos[]> {
        return this.http.get<Cupos[]>(environment.userServer + 'api/CuposBase');
    }

    getCupoBaseById(ID: number): Observable<Cupos> {
        return this.http.get<Cupos>(environment.userServer + 'api/CuposBase/' + ID);
    }

    updateCupoBase(cupoBase: CuposDetail) {
        return this.http.put(environment.userServer + 'api/CuposBase/' + cupoBase.idECCupoBase, cupoBase);
    }
}

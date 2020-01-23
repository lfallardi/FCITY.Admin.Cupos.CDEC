import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
// import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
// import { Alert, AlertType } from 'src/model/alert';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AlertService {
    constructor(private _snackBar: MatSnackBar) {
    }

    private configSuccess: MatSnackBarConfig = {
        panelClass: ['style-succes'],
        duration: 6000
    };

    private configError: MatSnackBarConfig = {
        panelClass: ['style-error'],
        duration: 6000
    };

    private configWarning: MatSnackBarConfig = {
        panelClass: ['style-warning'],
        duration: 6000
    };

    private configInfo: MatSnackBarConfig = {
        panelClass: ['style-info'],
        duration: 6000
    };

    public success(message) {
        this._snackBar.open(message, '', this.configSuccess);
    }

    public error(message) {
        this._snackBar.open(message, '', this.configError);
    }

    public warning(message) {
        this._snackBar.open(message, '', this.configWarning);
    }

    public info(message) {
        this._snackBar.open(message, '', this.configInfo);
    }
}

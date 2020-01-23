import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Province } from 'src/app/client/model/province';
import { Profile } from 'src/app/client/model/profile';
import { environment } from 'src/environments/environment';
import { Theme } from 'src/app/client/model/theme';
import { GenericValues } from 'src/app/client/model/genericValues';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  constructor(private http: HttpClient) {

  }

  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(environment.userServer + '/api/Parameters/provinces');
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(environment.userServer + '/api/Parameters/profiles');
  }

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(environment.userServer + '/api/Parameters/themes');
  }

  getGenders(): Observable<GenericValues[]> {
    return of([
      {
        key: 'Male',
        value: 'Masculino'
      }, {
        key: 'Female',
        value: 'Femenino'
      }
      , {
        key: 'Unspecified',
        value: 'Otro'
      }]);
  }

   getStatus(): Observable<GenericValues[]> {
    return of([
      {
        key: 'Disabled',
        value: 'Deshabilitado'
      },
      {
        key: 'Active',
        value: 'Activo'
      },
      {
        key: 'PasswordLocked',
        value: 'Contraseña bloqueada'
      },
      {
        key: 'PendingEmailConfirmation',
        value: 'Pendiente de confirmacion de email'
      },
      {
        key: 'PendingPasswordReset',
        value: 'Pendiente de reseteo de contraseña'
      },
      {
        key: 'New',
        value: 'Nuevo'
      }]);
  }

  getReferences(): Observable<GenericValues[]> {
    return of([
      {
        key: ' %NOMBRE%',
        value: 'Nombre cliente'
      },
      {
        key: '%APELLIDO%',
        value: 'Apellido cliente'
      },
      {
        key: '%APODO%',
        value: 'Apodo cliente'
      },
      {
        key: '%EMAIL%',
        value: 'Email cliente'
      },
      {
        key: '%DNI%',
        value: 'DNI cliente'
      },
      {
        key: '%FECHA_NACIMIENTO%',
        value: 'Fecha Nacimiento cliente'
      },
      {
        key: '%TELEFONO%',
        value: 'Teléfono cliente'
      }   ,
      {
        key: '%PROVINCIA%',
        value: 'Provincia cliente'
      }     ,
      {
        key: '%CIUDAD%',
        value: 'Ciudad cliente'
      }      ,
      {
        key: '%CODIGO_POSTAL%',
        value: 'Código Potal cliente '
      } ,
      {
        key: '%CALLE%',
        value: 'Calle cliente'
      } ,
      {
        key: '%NUMERO%',
        value: 'Número cliente'
      } ,
      {
        key: '%GENERO%',
        value: 'Masculino/Femenino/Otro'
      },
      {
        key: '%INTERESES%',
        value: 'Intereses separados por coma'
      } ,
      {
        key: '%TEMATICAS%',
        value: 'Temáticas separadas por coma'
      }




    ]);
  }



  getDynamicFieldsType(): Observable<GenericValues[]> {
    return of([
      {
        key: 'String',
        value: 'Alfanumérico'
      },
      {
        key: 'Numeric',
        value: 'Número'
      },
      {
        key: 'Date',
        value: 'Fecha'
      },
      {
        key: 'Email',
        value: 'Correo'
      }]);
  }

  getDynamicFieldVisualizationType(): Observable<GenericValues[]> {
    return of([
      {
        key: 'Input',
        value: 'Input'
      },
      {
        key: 'CheckBox',
        value: 'CheckBox'
      },
      {
        key: 'RadioButton',
        value: 'RadioButton'
      },
      {
        key: 'DropDown',
        value: 'DropDown'
      }]);
  }

  getDynamicFieldGroupingType(): Observable<GenericValues[]> {
    return of([
      {
        key: 'Province',
        value: 'Provincia'
      },
      {
        key: 'Theme',
        value: 'Temas'
      },
      {
        key: 'Profile',
        value: 'Preferencia'
      },
      {
        key: 'Gender',
        value: 'Genero'
      },
      {
        key: 'City',
        value: 'Ciudad'
      },
      {
        key: 'BirthDate',
        value: 'Fecha de cumpleaños'
      }]);
  }
}

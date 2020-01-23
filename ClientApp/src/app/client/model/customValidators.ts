import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


export class CustomValidators {

    static emailPattern() {
        // tslint:disable-next-line: max-line-length
        return '^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$';
    }

    static ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const now = new Date();
        now.setFullYear(now.getFullYear() - 18);
        const date = new Date(control.value);
        if (control.value !== undefined && date >= now) {
            return { 'age': true };
        }
        return null;
    }

    static dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const date = new Date(control.value);
        if (control.value !== undefined && (date.getFullYear() < 1000 || date.getFullYear() > 2999)) {
            return { 'invalidDate': true };
        }
        return null;
    }

    static dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const date1 = c.get(dateField1).value;
            const date2 = c.get(dateField2).value;
            if ((date1 !== null && date2 !== null && date2 !== '' && date2 !== '' ) && date1 > date2) {
                return validatorField;
            }
            return null;
        };
    }

    static checkPasswords(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.repeatPassword.value;

        return pass === confirmPass ? null : { notSame: true };
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.touched);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.touched);

        return (invalidCtrl || invalidParent);
    }
}

export const errorMessages = {
    requiredFirstName: 'Completá tu nombre',
    requiredLastName: 'Completá tu apellido',
    requiredNickname: 'Completá tu apodo',
    requiredDni: 'Completá tu DNI',
    incorrectDni: 'El DNI debe contener sólo números',
    incorrectDniLength: 'El DNI debe tener 7 u 8 números',
    requiredEmail: 'Completá tu e-mail',
    incorrectEmail: 'El correo electrónico no tiene el formato correcto',
    requiredDateOfBirth: 'Completá tu fecha de nacimiento',
    incorrectDateOfBirth: 'Debes ser mayor de 18 años para registarte',
    invalidDate: 'La fecha ingresada no es una fecha válida',
    requiredGender: 'Completá tu género',
    requiredProvince: 'Completá tu provincia',
    requiredPassword: 'Completá la contraseña',
    incorrectPassword: 'Completá al menos 8 caracteres, un número y una letra mayúscula',
    notSamePassword: 'Las contraseñas no coinciden',
    requiredDniType: 'Completá tu tipo de documento',
    requiredRole: 'Seleccioná un Rol',

    incorrectString: 'El campo no debe contener caracteres especiales',

    requiredCode: 'Completá el código',
    requiredDescription: 'Completá la Descripción',
    requiredFrom: 'Completá el remitente',
    requiredSubject: 'Completá el asunto',

    requiredName: 'Completá el nombre',
    requiredDynamicFieldType: 'Seleccioná el tipo de campo',
    requiredVisualizationType: 'Seleccioná el tipo de visualización',
    requiredOptions: 'Completá las opciones',
    requiredAttemptsLimit: 'Completá los número de intentos',
    requiredPriority: 'Completá la prioridad',

};

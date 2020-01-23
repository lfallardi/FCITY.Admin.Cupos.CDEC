import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


export class CustomValidators {

    static cuposProductosNamesValidator(group: FormGroup) {
        const name = group.controls.cupos.value;

        return name !== '' || name !== undefined ? null : true;
    }

    static cuposProductosExcepcionValidator(group: FormGroup) {
        const nameExcepcion = group.controls.cupos.value;
    }

    static dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const date = new Date(control.value);
        if (control.value !== undefined && (date.getFullYear() < 1000 || date.getFullYear() > 2999)) {
            return { 'invalidDate': true };
        }
        return null;
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
    requiredNombreProducto: 'Completá el nombre del producto',
    requiredPriority: 'Completá la prioridad',
    requiredCupos: 'Completá el cupo base',
    requiredHoraTope: 'Completá la hora tope',
    requiredDate: 'Completá la fecha',
    requiredPorcDeshabilita: 'Completá el porcentaje de cupos',
    requiredCuposTotales: 'Completá los cupos totales',
    requiredCuposMinimos: 'Completá los cupos minimos',
    requiredNombreTransportadora: 'Completá el nombre de la transportadora',
    requiredHoraPrevia: 'Completá la hora previa de preparación',
    requiredNombreExcepcion: 'Completá el nombre de la excepción',
    incorrectString: 'El campo no debe contener caracteres especiales',

};

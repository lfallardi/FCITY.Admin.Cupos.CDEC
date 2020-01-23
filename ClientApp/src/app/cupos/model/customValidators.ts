import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


export class CustomValidators {

    static cuposValidator(group: FormGroup) {
        const cupos = group.controls.cupos.value;

        return cupos !== '' || cupos !== undefined ? null : true ;
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
    requiredPriority: 'Completá la prioridad',
    requiredCupos: 'Completá la cantidad de cupos',
    requiredPorcDeshabilita: 'Completá el porcentaje de cupos',

    incorrectString: 'El campo no debe contener caracteres especiales',

};

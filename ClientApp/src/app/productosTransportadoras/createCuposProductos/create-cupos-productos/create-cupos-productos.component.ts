import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { ModalConfirmComponent } from '../../../common/modal-confirm/modal-confirm.component';
import { ModalConfig } from '../../../common/modal-confirm/model/ModalConfig';
import { CustomValidators, errorMessages } from '../../model/customValidators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
// services
import { ModalService } from '../../../../services/modal.service';
import { SpinnerService } from '../../../../services/spinner.service';
import { AlertService } from '../../../../services/alert.service';
import { ParameterService } from '../../../../services/Parameter.service';
import { CuposProductosDetail } from '../../model/CuposProductosDetail';
import { CuposBaseService } from 'src/services/cuposBase.service';

export interface Prioridad {
  value: string;
  viewValue: string;
}

export interface CuposBases {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-create-cupos-productos',
  templateUrl: './create-cupos-productos.component.html',
  styleUrls: ['./create-cupos-productos.component.css']
})
export class CreateCuposProductosComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public CupoProductoDet: CuposProductosDetail,
              private modalService: ModalService, private spinnerService: SpinnerService,
              private alertService: AlertService, private fb: FormBuilder, public parameterSerice: ParameterService,
              private cupoBaseService: CuposBaseService) {
                this.setForm();
              }

  spinnerMessage: 'Creado cupo producto...';
  errors = errorMessages;
  createCuposProductosForm: FormGroup;
  public onCreateCuposProductos = new EventEmitter();
  idECCupoBase = 0;

  Prioridades: Prioridad[] = [
    {value: 'A', viewValue: 'Alta'},
    {value: 'N', viewValue: 'Normal'},
    {value: 'B', viewValue: 'Baja'},
  ];

  cmbCuposBases: CuposBases[] = [
    {value: 1, viewValue: 'Lunes'},
    {value: 2, viewValue: 'Martes'},
    {value: 3, viewValue: 'Miercoles'},
    {value: 4, viewValue: 'Jueves'},
    {value: 5, viewValue: 'Viernes'},
    {value: 6, viewValue: 'Sabado'},
    {value: 7, viewValue: 'Domingo'}
  ];

  ngOnInit() {
  }

  setForm() {
    this.createCuposProductosForm = this.fb.group({
      nombreProducto: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      Prioridad: ['', Validators.required],
      CupoBase: ['', Validators.required],
      horaTope: '',
      cantCupos: {value: '', disabled: true},
      porcDeshabilita: {value: '', disabled: true},
      cupoMinimo: {value: '', disabled: true},
      checkActivo: true,
      checkDom: true,
      checkExcepcion: false,
      // Excepcion
      Excepcion: '',
      fechaInicio: '',
      fechaFin: '',
      cuposTotalesExcepcion: 0,
      horaTopeExcepcion: '',
      porcDeshabilitaExcepcion: 0,
      cuposMinimosExcepcion: 0,
      checkActivoExcepcion: false
    });
  }

  createNewCupoProducto() {
    if (this.createCuposProductosForm.valid) {
      let dialogRef;

      dialogRef = this.modalService.open(ModalConfirmComponent, {
        width: '750px',
        data: this.configModalConfirm(),
        autoFocus: false
      });

      dialogRef.componentInstance.onConfirm.subscribe(() => {
        this.spinnerService.show();

        this.spinnerService.hide();
        this.alertService.success('Se agregaron los datos de forma exitosa!');
        this.onCreateCuposProductos.emit();
      });
    }
  }

  loadCupoBase(value) {
    this.cupoBaseService.getCupoBaseById(value).pipe()
    .subscribe(cupo => { this.createCuposProductosForm.controls['cantCupos'].setValue(cupo.cuposTotales);
                         this.createCuposProductosForm.controls['porcDeshabilita'].setValue(cupo.porcCuposDesactiva);
                         this.createCuposProductosForm.controls['cupoMinimo'].setValue(100 - cupo.porcCuposDesactiva);
                         this.idECCupoBase = cupo.idECCupoBase;
                       },
                         error => { console.log(error, error.message); });

  }

  mustDisableCreateButton() {
    if (!this.createCuposProductosForm.get('checkActivoExcepcion').value) {
      return (this.createCuposProductosForm.get('nombreProducto').value === ''
           && this.createCuposProductosForm.get('Prioridad').value === ''
           && this.createCuposProductosForm.get('CupoBase').value === ''
           && this.createCuposProductosForm.get('nombreTransportadora').value === ''
           && this.createCuposProductosForm.get('horasPrevias').value === ''
           && this.createCuposProductosForm.get('horasTransportadora').value === '');
    }
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea agregar el registro?';
    modalConfig.tittle = 'Confirmar registro';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }

}

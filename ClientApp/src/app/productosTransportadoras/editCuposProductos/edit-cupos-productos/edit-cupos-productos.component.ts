import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ModalConfirmComponent } from '../../../common/modal-confirm/modal-confirm.component';
import { ModalConfig } from '../../../common/modal-confirm/model/ModalConfig';
// service
import { SpinnerService } from '../../../../services/spinner.service';
import { ModalService } from '../../../../services/modal.service';
import { ParameterService } from '../../../../services/Parameter.service';
import { AlertService } from '../../../../services/alert.service';
import { CuposProductosDetail } from '../../model/CuposProductosDetail';
import { CustomValidators, errorMessages } from 'src/app/cupos/model/customValidators';

@Component({
  selector: 'app-edit-cupos-productos',
  templateUrl: './edit-cupos-productos.component.html',
  styleUrls: ['./edit-cupos-productos.component.css']
})
export class EditCuposProductosComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cupoProductoDet: CuposProductosDetail,
              private modalService: ModalService, private spinnerService: SpinnerService,
              private alertService: AlertService, private fb: FormBuilder,
              public parameterService: ParameterService) {
                this.setForm();
              }

  spinnerMessage: 'Editando cupos...';
  errors = errorMessages;
  updateCupoProducto: FormGroup;
  public onUpdateComplete = new EventEmitter();

  ngOnInit() {
  }

  setForm() {
    this.updateCupoProducto = this.fb.group({
      nombreProducto: [this.cupoProductoDet.nombreProducto, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      Prioridad: [this.cupoProductoDet.prioridad, Validators.required],
      CupoBase: [this.cupoProductoDet.cupoBase, Validators.required],
      horaTope: this.cupoProductoDet.horaTope,
      cantCupos: {value: this.cupoProductoDet.cantCupos, disabled: true},
      porcDeshabilita: {value: this.cupoProductoDet.porcDeshabilita, disabled: true},
      cupoMinimo: {value: this.cupoProductoDet.cupoMinimo, disabled: true},
      checkActivo: this.cupoProductoDet.activo,
      checkDom: this.cupoProductoDet.dom2,
      checkExcepcion: this.cupoProductoDet.checkExcepcion,
      // Excepcion
      Excepcion: this.cupoProductoDet.nombreExcepcion,
      fechaInicio: this.cupoProductoDet.fechaIni,
      fechaFin: this.cupoProductoDet.fechaFin,
      cuposTotalesExcepcion: this.cupoProductoDet.cuposTotalesExcepcion,
      horaTopeExcepcion: [this.cupoProductoDet.horaTopeExcepcion, Validators.required],
      porcDeshabilitaExcepcion: this.cupoProductoDet.porDeshabilitaExcepcion,
      cuposMinimosExcepcion: this.cupoProductoDet.cuposMinimosExcepcion,
      checkActivoExcepcion: this.cupoProductoDet.checkActivoExcepcion,
      // transportadora
      nombreTransportadora: [this.cupoProductoDet.nombreTransportadora,
                             Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      horasPrevias: [this.cupoProductoDet.horasPrevias, Validators.required],
      checkActivoTransportadora: this.cupoProductoDet.checkActivoTransportadora,
      horasTransportadora: [this.cupoProductoDet.horasTransportadora, Validators.required],
      diasPromesa: this.cupoProductoDet.diasPromesa
    });
  }

  setUpdateCupos() {
    if (this.updateCupoProducto.valid) {
      let dialogRef;

      dialogRef = this.modalService.open(ModalConfirmComponent, {
        width: '750px',
        data: this.configModalConfirm(),
        autoFocus: false
      });

      dialogRef.componentInstance.onConfirm.subscribe(() => {
        this.spinnerService.show();
        this.spinnerService.hide();
        this.alertService.success('Se actualizaron los datos de forma exitosa!');
        this.onUpdateComplete.emit();
      });

    }
  }

  configModalConfirm(): ModalConfig {
    const modalConfig = new ModalConfig();
    modalConfig.btnLabel = 'Aceptar';
    modalConfig.message = '¿Está seguro que desea confirmar los cambios?';
    modalConfig.tittle = 'Confirmar edición';
    modalConfig.showCancelButton = true;
    modalConfig.showCrossButton = true;
    return modalConfig;
  }

}

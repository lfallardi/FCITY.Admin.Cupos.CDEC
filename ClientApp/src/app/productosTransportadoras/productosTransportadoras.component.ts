import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { CuposProductos } from 'src/model/cuposProductos';
import { SharedService } from 'src/services/shared.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/services/modal.service';
import { ParameterService } from 'src/services/Parameter.service';
import { SpinnerService } from 'src/services/spinner.service';
import { ScreenElementsService } from 'src/services/screen-elements.service';
import { CustomValidators } from './model/customValidators';
import { CreateCuposProductosComponent } from './createCuposProductos/create-cupos-productos/create-cupos-productos.component';
import { EditCuposProductosComponent } from './editCuposProductos/edit-cupos-productos/edit-cupos-productos.component';

export interface Prioridad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-productosTransportadoras',
  templateUrl: './productosTransportadoras.component.html',
  styleUrls: ['./productosTransportadoras.component.css']
})

export class ProductosTransportadorasComponent implements OnInit {
  spinnerMessage = 'Cargando...';
  filterForm: FormGroup;
  selection: SelectionModel<CuposProductos>;

  Prioridades: Prioridad[] = [
    {value: 'A', viewValue: 'Alta'},
    {value: 'N', viewValue: 'Normal'},
    {value: 'B', viewValue: 'Baja'},
    {value: 'NA', viewValue: 'No aplica'}
  ];

  estadosCupos: Prioridad[] = [
    {value: 'A', viewValue: 'Activo'}
  ];

  constructor(private sharedService: SharedService, private router: Router, public modalService: ModalService,
              public parameterService: ParameterService, private spinnerService: SpinnerService, private fb: FormBuilder,
              private screenElementsService: ScreenElementsService) {
                this.setForm();
              }

  ngOnInit() {
  }

  mustDisableSearchButton() {
    return (this.filterForm.get('nombreProducto').value === ''
         && this.filterForm.get('Prioridad').value === ''
         && this.filterForm.get('nombreTransportadora').value === ''
         && this.filterForm.get('statusCupoProducto').value === ''
         && this.filterForm.get('excepcion').value === ''
         && !this.filterForm.get('checkCuposActivo').value);
  }

  setForm() {
    this.filterForm = this.fb.group({
      nombreProducto: [''],
      Prioridad: [''],
      statusCupoProducto: [''],
      nombreTransportadora: [''],
      excepcion: [''],
      checkCuposActivo: false
    });
  }

  cleanFilters() {
    this.filterForm.setValue({
      nombreProducto: '',
      Prioridad: '',
      statusCupoProducto: '',
      nombreTransportadora: '',
      excepcion: '',
      checkCuposActivo: false
    });
    // this.paginator.pageIndex = 0;
    // this.initData();
  }

  openCreateCupoProducto(cupoProducto: CuposProductos): void {
    let dialogRef;
    dialogRef = this.modalService.open(CreateCuposProductosComponent, {
      width: '900px',
      height: '80%',
      autoFocus: false
    });

  }

  editCreateCupoProducto(cupoProducto: CuposProductos): void {
    let dialogRef;
    dialogRef = this.modalService.open(EditCuposProductosComponent, {
      width: '900px',
      height: '80px',
      autoFocus: false
    });
  }

}

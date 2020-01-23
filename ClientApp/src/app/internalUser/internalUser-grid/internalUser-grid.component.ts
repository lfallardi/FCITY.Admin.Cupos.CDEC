import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { InternalUserGridDataSource } from './internalUser-grid-datasource';
import { InternalUserService } from 'src/services/internalUser.service';
import { InternalUser } from '../model/internalUser';
import { SynchronizationService } from 'src/services/synchronization.service';
import { ScreenElementsService } from 'src/services/screen-elements.service';
import { SpinnerService } from 'src/services/spinner.service';
import { ModalService } from 'src/services/modal.service';
import { CreateInternalUserComponent } from '../create-internal-user/create-internal-user.component';
// import { CreateClientComponent } from 'src/app/client/create-client/create-client.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalConfig } from 'src/app/common/modal-confirm/model/ModalConfig';
import { ModalConfirmComponent } from 'src/app/common/modal-confirm/modal-confirm.component';
import { AlertService } from 'src/services/alert.service';
// import { EditRoleComponent } from 'src/app/configuration/role/edit-role/edit-role.component';
import { EditInternalUserRoleComponent } from '../edit-role/edit-role.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internalUser-grid',
  templateUrl: './internalUser-grid.component.html',
  styleUrls: ['./internalUser-grid.component.css']
})

export class InternalUserGridComponent implements OnInit {

  constructor(private dataService: InternalUserService, private synchronizationService: SynchronizationService,
              private screenElementsService: ScreenElementsService,
              public modalService: ModalService, private alertService: AlertService, private spinnerService: SpinnerService,
              private router: Router) { }

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<InternalUser>;
  selection: SelectionModel<InternalUser>;
  dataSource: InternalUserGridDataSource;
  synchronizationDate: string;
  editInternalUserButtonEnabled: boolean;
  newInternalUserButtonEnabled: boolean;
  deleteInternalUserButtonEnabled: boolean;
  deleteAll: number = 0;
  length = 0;
  displayedColumns = ['Checkbox', 'Nombre', 'Apellido', 'Email', 'Rol', 'Fecha de creación', 'edit'];
  deleteMsg: string ;


  ngOnInit() {
    this.initData();
    this.loadInternalUserElements();
    this.initialSelection();
  }

  loadInternalUserElements() {
    this.editInternalUserButtonEnabled = this.screenElementsService.getElementScreen('editInternalUserButton');
    this.newInternalUserButtonEnabled = this.screenElementsService.getElementScreen('newInternalUserButton');
    this.deleteInternalUserButtonEnabled = this.screenElementsService.getElementScreen('deleteInternalUserButton');
    if (!this.editInternalUserButtonEnabled) {
      this.displayedColumns = ['Checkbox', 'Nombre', 'Apellido', 'Email', 'Rol', 'Fecha de creación'];
    }
  }

  private initData(): void {
    this.dataService.getAll().subscribe(users => {
      this.dataSource = new InternalUserGridDataSource();
      this.updateSyncroInformation();
      this.dataSource.data = users;
      this.afterInitTable();
      this.length = users.length;
    }, error => {
      console.log(error);
    });
  }

  afterInitTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  private updateSyncroInformation() {
    this.synchronizationService.getLastDateOfSynchronization().subscribe(
      response => {
        this.synchronizationDate = response.date;
      },
      errorResponse => {
        this.synchronizationDate = '';
      });
  }

  openCreateUserDialog(): void {
    let dialogRef;
    dialogRef = this.modalService.open(CreateInternalUserComponent, {
      width: '800px',
      autoFocus: false
    });

    dialogRef.componentInstance.onCreateComplete.subscribe(() => {
      this.modalService.closeAll();
      this.initData();
    });

  }

  mustAbleDeleteButton() {
    return (this.selection.selected.length === 0);
  }

  private initialSelection() {
    console.log('initialSelection');
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<InternalUser>(allowMultiSelect, initialSelection);
  }


  isAllSelected() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.getData().length;
    return numSelected === numRows;
  }

  masterToggle() {

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    this.isAllSelected() ?
      this.selection.clear() :


      this.dataSource.getData().forEach(row => this.selection.select(row));
  }

  deleteUInternalUser() {
    let dialogRef;
    const notDisabledClients = this.selection.selected.filter(r => r.status !== 'Disabled');
    const modalConfig = new ModalConfig();
    if (notDisabledClients.length === 1) {
      modalConfig.message = ' ¿Está seguro que desea eliminar el siguiente usuario?';
      modalConfig.tittle = 'Eliminar usuario';
    } else {
      modalConfig.message = ' ¿Está seguro que desea eliminar los siguientes usuarios?';
      modalConfig.tittle = 'Eliminar usuario';
    }
    modalConfig.body = notDisabledClients.map(u => u.email).join('<br />');
    modalConfig.showCrossButton = true;
    modalConfig.showCancelButton = true;
    dialogRef = this.modalService.open(ModalConfirmComponent, {
      width: '600px',
      data: modalConfig,
      autoFocus: false
    });



    dialogRef.componentInstance.onConfirm.subscribe(() => {

      notDisabledClients.map(u => u).forEach(element => {
        this.dataService.delete(element.key).subscribe(
          response => {

            if (notDisabledClients.length > 1) {
              if (this.deleteMsg === undefined) {
                this.deleteMsg = 'Se eliminaron los usuarios ' + element.email;
              } else {
                this.deleteMsg = this.deleteMsg + ', ' + element.email;
              }
            } else {
              this.deleteMsg = 'Se eliminó el usuario ' + element.email;
            }
            this.deleteAll = this.deleteAll + 1;
            if (this.deleteAll === notDisabledClients.length) {
              this.showDeleteMsg();
            }
          },
          errorResponse => {
            errorResponse.error.Errors.forEach(e => this.alertService.error(e));
          });
      },
      );
    });
  }

  showDeleteMsg() {
    if (this.deleteMsg !== undefined) {
      this.alertService.success(this.deleteMsg + ' de forma exitosa!');
    }
    this.selection.clear();
    this.deleteAll = 0;
    this.deleteMsg = undefined;
    this.initData();
  }

  editInternalUserRole(internalUser: InternalUser): void {
    let dialogRef;
    dialogRef = this.modalService.open(EditInternalUserRoleComponent, {
      width: '800px',
      data: internalUser,
      autoFocus: false
    });

    dialogRef.componentInstance.onEditComplete.subscribe(() => {
      this.modalService.closeAll();
      this.initData();
    });

  }


}


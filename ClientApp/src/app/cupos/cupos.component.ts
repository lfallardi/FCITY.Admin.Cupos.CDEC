import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SynchronizationService } from '../../services/synchronization.service';
import { ModalService } from '../../services/modal.service';

import { EditCupoBaseComponent } from './editCupoBase/editCupoBase.component';
import { Cupos } from 'src/model/cupos';
import { CuposBaseService } from 'src/services/cuposBase.service';
import { CuposDataSource } from './CuposDataSource';

@Component({
  selector: 'app-cupos',
  templateUrl: './cupos.component.html',
  styleUrls: ['./cupos.component.css']
})

export class CuposComponent implements OnInit {
  displayedColumns: string[] = ['idECCupoBase', 'dia', 'cuposTotales', 'porcCuposDesactiva', 'edition'];

  synchronizationDate: string;
  errorMessage: string;

  isLoading: true;
  length: 0;

  constructor(private synchronizationService: SynchronizationService, private modalService: ModalService,
              private dataService: CuposBaseService) { }

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatTable, {static: true}) table: MatTable<Cupos>;
    dataSource = new CuposDataSource(this.dataService, this.sort);

  ngOnInit() {
    this.initData();
  }

  private initData(): void {
    this.isLoading = true;
    this.dataSource = new CuposDataSource(this.dataService, this.sort);
    this.dataSource.clearGrid();
    this.dataSource.loadCupos();
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

  editCupoBase(cupo: Cupos): void {
    let dialogRef;
    dialogRef = this.modalService.open(EditCupoBaseComponent, {
      width: '800px',
      data: cupo,
      autoFocus: false
    });

    dialogRef.componentInstance.onUpdateComplete.subscribe(() => {
      this.modalService.closeAll();
      this.initData();
    });

  }

}

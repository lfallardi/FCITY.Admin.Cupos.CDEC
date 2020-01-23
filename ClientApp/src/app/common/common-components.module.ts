import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { MatDialogModule, MatDividerModule, MatIconModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule
  ],
  declarations: [
    ModalConfirmComponent
  ],
  entryComponents: [
    ModalConfirmComponent
  ],
  providers: []
})
export class CommonComponentsModule { }

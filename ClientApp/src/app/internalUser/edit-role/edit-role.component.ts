import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../model/role';
import { MyErrorStateMatcher, errorMessages } from 'src/app/client/model/customValidators';
import { RoleService } from 'src/services/role.service';
import { SpinnerService } from 'src/services/spinner.service';
import { InternalUserService } from 'src/services/internalUser.service';
import { AlertService } from 'src/services/alert.service';
import { InternalUser } from '../model/internalUser';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UpdateInternalUserRequest } from '../model/request/updateInternalUserRequest';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditInternalUserRoleComponent implements OnInit {

  public onEditComplete = new EventEmitter();
  editRoleForm: FormGroup;
  roles: Role[];
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();
  updateInternalUserRequest: UpdateInternalUserRequest;

  constructor(@Inject(MAT_DIALOG_DATA) public internalUser: InternalUser, public roleService: RoleService,
              private fb: FormBuilder, private alertService: AlertService, private spinnerService: SpinnerService,
              private internalUserService: InternalUserService) {

    this.editRoleForm = this.fb.group({
      role: [this.internalUser.role.code, Validators.required]
    });
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
      response => { this.roles = response.sort((p1, p2) => p1.code > p2.code ? 1 : -1); },
      errorResponse => {
        errorResponse.error.Errors.forEach(e => this.alertService.error(e));
      });
  }

  setNewRole() {
    if (this.editRoleForm.valid) {
      this.spinnerService.show();


      this.updateInternalUserRequest = new UpdateInternalUserRequest(this.internalUser.key, this.editRoleForm.value.role );

      this.internalUserService.updateRole(this.updateInternalUserRequest).subscribe(
        response => {
          this.spinnerService.hide();
          this.alertService.success('¡El Rol ha sido editado satisfactoriamente!');
          this.onEditComplete.emit();
        },
        errorResponse => {
          this.spinnerService.hide();
          errorResponse.error.Errors.forEach(e => this.alertService.error(e));
        });
    }
  }
}

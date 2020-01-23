import { Component, OnInit, EventEmitter } from '@angular/core';
import { InternalUserService } from 'src/services/internalUser.service';
import { AlertService } from 'src/services/alert.service';
// import { ParameterService } from 'src/services/Parameter.service';
import { SpinnerService } from 'src/services/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, errorMessages, MyErrorStateMatcher } from 'src/app/client/model/customValidators';
import { RoleService } from 'src/services/role.service';
import { Role } from '../model/role';
import { CreateInternalUserRequest } from '../model/request/createInternalUserRequest';

@Component({
  selector: 'app-create-internal-user',
  templateUrl: './create-internal-user.component.html',
  styleUrls: ['./create-internal-user.component.css']
})
export class CreateInternalUserComponent implements OnInit {
  spinnerMessage = 'Creando Usuario...';
  public onCreateComplete = new EventEmitter();
  createUserForm: FormGroup;
  roles: Role[];
  errors = errorMessages;
  matcher = new MyErrorStateMatcher();

  constructor(public roleService: RoleService,
              private fb: FormBuilder, private alertService: AlertService, private spinnerService: SpinnerService,
              private internalUserService: InternalUserService) {

    this.createUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(CustomValidators.emailPattern())])],
      role: ['', Validators.required],

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

  createNewUser() {
    if (this.createUserForm.valid) {
      this.spinnerService.show();

      const CreateInternalUserRequest = <CreateInternalUserRequest> this.createUserForm.value;
      this.internalUserService.createNewUser(CreateInternalUserRequest).subscribe(
        response => {
          this.spinnerService.hide();
          this.alertService.success('¡El Usuario ha sido creado satisfactoriamente!');
          this.onCreateComplete.emit();
        },
        errorResponse => {
          this.spinnerService.hide();
          errorResponse.error.Errors.forEach(e => this.alertService.error(e));
        });
    }
  }
}

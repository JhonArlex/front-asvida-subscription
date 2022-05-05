import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxLoadingService } from 'ngx-loading';
import { lastValueFrom } from 'rxjs';
import { CreateRoleGQL, GetPermissionsGQL, Permission, Role, UpdateRoleGQL } from 'src/app/core/graphql/graphq';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-role-action',
  templateUrl: './role-action.component.html',
  styleUrls: ['./role-action.component.css']
})
export class RoleActionComponent implements OnInit {

  formRole!: FormGroup;
  loading = false;
  permissions: Permission[] = [];
  role!: Role;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private roleService: RoleService,
    private createRoleGQL: CreateRoleGQL,
    private updateRoleGQL: UpdateRoleGQL,
    private getPermissionsGql: GetPermissionsGQL
  ) { }

  ngOnInit(): void {
    this.role = this.roleService.role;
    this.getPermissions();
  }

  buildForm() {
    this.formRole = this.fb.group({
      name: ['', Validators.required],
      permissions: new FormArray(this.role ? this.role.permissions.map(x => this.fb.control(x.id)) : []),
    });
    if (this.roleService.role) {
      this.formRole.get('name')!.setValue(this.roleService.role.name);
    }
  }

  goBack() {
    this.location.back();
  }

  save() {
    if (this.roleService.role) {
      this.updateRole();
    } else {
      this.createRole();
    }
  }

  checkPermission(event: any, permission: { id: any; }) {
    const permissionsForm = this.formRole.get('permissions') as FormArray;
    if (event.target.checked) {
      permissionsForm.push(this.fb.control(permission.id));
    } else {
      const i = permissionsForm.controls.findIndex((x: { value: any; }) => x.value === permission.id);
      permissionsForm.removeAt(i);
    }
  }

  validatePermission(permission: { id: any; }){
    const permissionsForm = this.formRole.get('permissions') as FormArray;
    const i = permissionsForm.controls.findIndex(x => x.value === permission.id);
    return i >= 0;
  }

  async createRole() {
    this.loading = true;
    const value = this.formRole.value;
    const data = await lastValueFrom(this.createRoleGQL.mutate({
      input: {
        name : value.name,
        permissions: value.permissions
      }
    }));
    this.loading = false;
    this.goBack();
  }

  async updateRole() {
    this.loading = true;
    const value = this.formRole.value;
    const data = await lastValueFrom(this.updateRoleGQL.mutate({
      input: {
        id: this.roleService.role.id,
        data: {
          name : value.name,
          permissions: value.permissions
        }
      }
    }));
    this.loading = false;
    this.goBack();
  }

  async getPermissions() {
    const permissions = await lastValueFrom(this.getPermissionsGql.fetch({}));
    this.permissions = permissions.data.getPermissions;
    this.buildForm();
  }

}

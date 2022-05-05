import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Role, DeleteRoleGQL, GetRolesGQL } from 'src/app/core/graphql/graphq';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  limit = 10;
  page = 1;
  private _color = "light";

  constructor(
    private getRolesGQL: GetRolesGQL,
    private roleService: RoleService,
    private deleteRoleGQL: DeleteRoleGQL,
    private router: Router
  ) { }

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }

  ngOnInit(): void {
    this.getRoles();
  }

  async getRoles() {
    const data = await lastValueFrom(this.getRolesGQL.fetch({input: {}}));
    this.roles = data.data.getRoles as Role[];
  }

  goToRoles(role: Role) {
    this.roleService.role = role;
    this.goAction();
  }

  add() {
    this.roleService.role = null;
    this.goAction();
  }

  goAction() {
    this.router.navigate(['/admin/role/action']);
  }

  deleteRole(role: Role) {
    const confirm = window.confirm('¿Está seguro de eliminar este cupón?');
    if (confirm) {
      lastValueFrom(this.deleteRoleGQL.mutate({id: role.id})).then(() => {
        this.getRoles();
      });

    }
  }

  onPageChange(page: number) {
    this.page = page;
    this.getRoles();
  }

}

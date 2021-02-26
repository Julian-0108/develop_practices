import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { ManageRolesService } from './services/manage-roles.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { NotificationService } from '@shared/components/notification/services/notification.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss'],
})
export class ManageRolesComponent implements OnInit {
  @ViewChild('listCtrl', { static: true }) listCtrl!: MatSelectionList;
  @ViewChildren('optionCtrl') optionsCtrl!: QueryList<MatListOption>;

  options: any = [];
  categories: any = [];
  roles: any = [];
  rolSelected!: any;

  dataSourceUsers = [];
  displayedColumns: string[] = ['nombre', 'correo', 'area', 'opciones'];
  constructor(
    public location: Location,
    private rolesService: ManageRolesService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getOptions();
  }

  getOptions() {
    this.categories = [];
    this.rolesService
      .getOptions()
      .then((response) => {
        this.options = response.payload;
        response.payload.forEach((option: any) => {
          if (this.categories.indexOf(option.category) === -1) {
            this.categories.push(option.category);
          }
        });
      })
      .catch();
  }

  getRoles() {
    this.rolesService
      .getRoles()
      .then((response) => {
        this.roles = response.payload;
      })
      .catch();
  }

  getUsersByRol() {
    this.rolesService
      .getUsersByRol(this.rolSelected._id)
      .then((response) => {
        if (response.payload.length > 0) {
          this.dataSourceUsers = response.payload[0].users;
        }
      })
      .catch();
  }

  selectRol(rol: any) {
    this.rolSelected = rol;
    this.optionsCtrl.forEach((element) => {
      element.selected = rol.access.includes(element.value);
    });
    this.getUsersByRol();
  }

  filterOptions(category: string) {
    return this.options.filter((data: any) => data.category === category);
  }



  deleteUser(user: any) {
    const roles = user.roles.filter((rol: string) => rol !== this.rolSelected._id);
    this.rolesService
      .updateUserRoles(user.correo, roles)
      .then(() => {
        this.notificationService.openSimpleSnackBar({
          type: 'success',
          title: 'Operación exitosa',
          message: 'Rol eliminado del usuario',
        });
        this.dataSourceUsers = this.dataSourceUsers.filter(
          (element: any) => element._id !== user._id
        );
      })
      .catch();
  }

  onDeleteUser(user: any) {
    this.notificationService
      .openComplexSnackBar({
        type: 'warning',
        message: `¿Desea eliminar el rol ${this.rolSelected.name} al usuario?`,
        title: 'Confirmar acción',
      })
      .afterClosed()
      .toPromise()
      .then((response) =>  { if(response && response !== 'close') { this.deleteUser(user)} })
  }

  onSave() {
    if (!this.rolSelected) {
      this.notificationService.openSimpleSnackBar({
        type: 'info',
        title: 'Guardar cambios',
        message: 'No hay rol seleccionado',
      });
      return;
    }

    const access: string[] = [];
    this.optionsCtrl.forEach((element) => {
      if (element.selected) {
        access.push(element.value);
      }
    });

    this.rolesService
      .updateRoles(this.rolSelected._id, access)
      .then(() => {
        this.notificationService.openSimpleSnackBar({
          type: 'success',
          title: 'Actualización de roles',
          message: 'Permisos guardados correctamente',
        });
      })
      .catch();
  }
}

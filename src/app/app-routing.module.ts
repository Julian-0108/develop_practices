import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'movements',
    loadChildren: () =>
      import('./screens/sites/movements/movements.module').then((m) => m.MovementsModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'temperature',
    loadChildren: () =>
      import('./screens/sites/temperature/temperature.module').then((m) => m.TemperatureModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'kits',
    loadChildren: () => import('./screens/sites/kits/kits.module').then((m) => m.KitsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-options',
    loadChildren: () =>
      import('./screens/profiles/profile-options/profile-options.module').then(
        (m) => m.ProfileOptionsModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'profile-template/:idProfile',
    loadChildren: () =>
      import('./screens/profiles/profile-template/profile-template.module').then(
        (m) => m.ProfileTemplateModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'generateqr',
    loadChildren: () =>
      import('./screens/sites/generateqr/generateqr.module').then((m) => m.GenerateqrModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'admin-profiles',
    loadChildren: () =>
      import('./screens/profiles/adminprofiles/adminprofiles.module').then(
        (m) => m.AdminprofilesModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'master-info',
    loadChildren: () =>
      import('./screens/profiles/admin-master-info/admin-master-info.module').then(
        (m) => m.AdminMasterInfoModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'selection-profiles',
    loadChildren: () =>
    import('./screens/profiles/profile-selection/profile-selection.module').then(
      (m) => m.ProfileSelectionModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-resumes',
    loadChildren: () =>
    import('./screens/profiles/profile-manage-resumes/profile-manage-resumes.module').then(
      (m) => m.ProfileManageResumesModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-base-teams/:id',
    loadChildren: () =>
      import('./screens/profiles/manage-base-teams/manage-base-teams.module').then(
        (m) => m.ManageBaseTeamsModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'manage-roles',
    loadChildren: () => import('./screens/permission-management/manage-roles/manage-roles.module').then((m) => m.ManageRolesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-users',
    loadChildren: () => import('./screens/permission-management/manage-users/manage-users.module').then((m) => m.ManageUsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'notPermits',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'underConstruction',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'enabled',
      // anchorScrolling: 'enabled',
    })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

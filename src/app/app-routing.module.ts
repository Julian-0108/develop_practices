import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'prueba' },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'prueba',
    loadChildren: () => import('./screens/prueba/prueba.module').then((m) => m.PruebaModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'movements',
    loadChildren: () =>
      import('./screens/sites/movements/movements.module').then((m) => m.MovementsModule)
  },
  {
    path: 'temperature',
    loadChildren: () =>
      import('./screens/sites/temperature/temperature.module').then((m) => m.TemperatureModule)
  },
  {
    path: 'kits',
    loadChildren: () => import('./screens/sites/kits/kits.module').then((m) => m.KitsModule)
  },
  {
    path: 'profile-options',
    loadChildren: () =>
      import('./screens/profiles/profile-options/profile-options.module').then(
        (m) => m.ProfileOptionsModule
      )
  },
  {
    path: 'profile-template/:idProfile',
    loadChildren: () =>
      import('./screens/profiles/profile-template/profile-template.module').then(
        (m) => m.ProfileTemplateModule
      )
  },
  {
    path: 'generate-qr',
    loadChildren: () =>
      import('./screens/sites/generateqr/generateqr.module').then(
        (m) => m.GenerateqrModule
      )
  },
  {
    path: 'admin-profiles',
    loadChildren: () =>
      import('./screens/profiles/adminprofiles/adminprofiles.module').then(
        (m) => m.AdminprofilesModule
      )
  },
  {
    path: 'master-info',
    loadChildren: () =>
      import('./screens/profiles/admin-master-info/admin-master-info.module').then(
        (m) => m.AdminMasterInfoModule
      )
  },
  {
    path: 'config-table',
    loadChildren: () =>
      import('./screens/sites/configTable/configTable.module').then(
        (m) => m.ConfigTableModule
      )
  },
  {
    path: 'selection-profiles',
    loadChildren: () =>
    import('./screens/profiles/profile-selection/profile-selection.module').then(
      (m) => m.ProfileSelectionModule
    )
  },
  {
    path: 'sites',
    loadChildren: () =>
    import('./screens/sites/site.module').then(
      (m) => m.SiteModule
    )
  },
  {
    path: 'reports',
    loadChildren: () =>
    import('./screens/reports/reports.module').then(
      (m) => m.ReportsModule
    )
  },
  {
    path: 'manage-resumes',
    loadChildren: () =>
    import('./screens/profiles/profile-manage-resumes/profile-manage-resumes.module').then(
      (m) => m.ProfileManageResumesModule
    )
  },
  {
    path: 'add-resume',
    loadChildren: () =>
    import('./screens/profiles/profile-manage-resumes/add-resume/add-resume.module').then(
      (m) => m.AddResumeModule
    )
  },
  {
    path: 'manage-base-teams/:id',
    loadChildren: () =>
      import('./screens/profiles/manage-base-teams/manage-base-teams.module').then(
        (m) => m.ManageBaseTeamsModule
      )
  },
  {
    path: 'manage-roles',
    loadChildren: () => import('./screens/permission-management/manage-roles/manage-roles.module').then((m) => m.ManageRolesModule)
  },
  {
    path: 'manage-users',
    loadChildren: () => import('./screens/permission-management/manage-users/manage-users.module').then((m) => m.ManageUsersModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule)
  },
  {
    path: 'notPermits',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule)
  },
  {
    path: 'underConstruction',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: 'prueba',
    pathMatch: 'full'
  }
  /* {
    path: '**',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule)
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'enabled',
      // anchorScrolling: 'enabled',
    })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

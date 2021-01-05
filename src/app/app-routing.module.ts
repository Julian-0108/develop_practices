import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMasterInfoModule } from './screens/profiles/admin-master-info/admin-master-info.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'movements',
    loadChildren: () =>
      import('./screens/sites/movements/movements.module').then((m) => m.MovementsModule),
  },
  {
    path: 'temperature',
    loadChildren: () =>
      import('./screens/sites/temperature/temperature.module').then((m) => m.TemperatureModule),
  },
  {
    path: 'kits',
    loadChildren: () => import('./screens/sites/kits/kits.module').then((m) => m.KitsModule),
  },
  {
    path: 'profile-options',
    loadChildren: () =>
      import('./screens/profiles/profile-options/profile-options.module').then(
        (m) => m.ProfileOptionsModule
      ),
  },
  {
    path: 'generateqr',
    loadChildren: () =>
      import('./screens/sites/generateqr/generateqr.module').then((m) => m.GenerateqrModule),
  },
  {
    path: 'admin-profiles',
    loadChildren: () =>
      import('./screens/profiles/adminprofiles/adminprofiles.module').then(
        (m) => m.AdminprofilesModule
      ),
  },
  {
    path: 'master-info',
    loadChildren: () =>
      import('./screens/profiles/admin-master-info/admin-master-info.module').then(
        (m) => m.AdminMasterInfoModule
      ),
  },
  {
    path: 'error',
    loadChildren: () => import('./screens/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: '**',
    loadChildren: () => import('./screens/notfound/notfound.module').then((m) => m.NotfoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "login",
    loadChildren: () =>
      import("./screens/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./screens/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "movements",
    loadChildren: () =>
      import("./screens/movements/movements.module").then(
        (m) => m.MovementsModule
      ),
  },
  {
    path: "temperature",
    loadChildren: () =>
      import("./screens/temperature/temperature.module").then(
        (m) => m.TemperatureModule
      ),
  },
  {
    path: "kits",
    loadChildren: () =>
      import("./screens/kits/kits.module").then((m) => m.KitsModule),
  },
  {
    path: "profile-options",
    loadChildren: () =>
      import("./screens/profile-options/profile-options.module").then(
        (m) => m.ProfileOptionsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

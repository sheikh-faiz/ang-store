import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthGuardService } from './services/auth/auth.guard';
import { LoggedGuardService } from './services/auth/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [LoggedGuardService],

    loadChildren: () =>
      import('src/app/components/auth/auth.module').then(
        (mod) => mod.AuthModule
      ),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('src/app/components/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

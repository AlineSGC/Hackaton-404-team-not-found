import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AtalhosComponent } from './features/atalhos/atalhos.component';
import { RotinasComponent } from './features/rotinas/rotinas.component';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'atalhos', component: AtalhosComponent, canActivate: [authGuard] },
  { path: 'rotinas', component: RotinasComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

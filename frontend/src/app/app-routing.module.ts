import { Injector, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './pages/callback/callback.component';
import { LoggedOutComponent } from './pages/logged-out/logged-out.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { OktaAuthGuard } from './security/OktaAuthGuard';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent, canActivate: [OktaAuthGuard]},
  { path: 'callback', component: CallbackComponent },
  { path: 'login', component: LoggedOutComponent },
  { path: 'loggedout', component: LoggedOutComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

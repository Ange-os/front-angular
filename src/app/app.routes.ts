import { RouterModule, Routes } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { AutoGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path:'home', component: HomeComponent, canActivate: [AutoGuard] },
  { path:'login', component: SingInComponent},
  { path:'register', component: SingUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }

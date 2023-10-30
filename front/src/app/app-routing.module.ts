import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllpostComponent } from './allpost/allpost.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { MypostComponent } from './mypost/mypost.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'all-post',
    component: AllpostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatepostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-posts',
    component: MypostComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

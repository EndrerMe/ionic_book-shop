// Vendors
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AuthTabsPage } from 'src/app/tabs/auth-tabs/auth-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AuthTabsPage,
    children: [
      {
        path: 'catalog',
        redirectTo: '/main/catalog',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: 'src/app/pages/auth/login/login.module#LoginPageModule'
      },
      {
        path: 'registration',
        loadChildren: 'src/app/pages/auth/regist/regist.module#RegistPageModule'
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthPageRoutingModule {}

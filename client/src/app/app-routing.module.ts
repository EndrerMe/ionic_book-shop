// Vendors
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from 'src/app/shared/guards';
// Enums
import { userRole } from 'src/app/shared/enums';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/tabs/libraryTabs/libraryTabs.module#LibraryTabsPageModule'
  },
  {
    path: 'auth',
    loadChildren: 'src/app/tabs/auth-tabs/auth-tabs.module#AuthPageModule',
  },
  {
    path: 'main/auth',
    redirectTo: 'auth/login'
  },
  {
    path: 'book/:id',
    loadChildren: 'src/app/pages/library/book-view/book-view.module#BookViewPageModule'
  },
  {
    path: 'main/shopping-bag',
    redirectTo: 'shopping-bag'
  },
  {
    path: 'shopping-bag',
    loadChildren: 'src/app/pages/library/shopping-bag/shopping-bag.module#ShoppingBagPageModule'
  },
  {
    path: 'main/admin',
    redirectTo: 'admin/users'
  },
  {
    path: 'admin',
    loadChildren: 'src/app/tabs/admin-tabs/admin-tabs.module#AdminPageModule',
    canActivate: [AuthGuard],
    data: {roles: userRole.admin}
  },
  {
    path: 'user-area',
    loadChildren: 'src/app/pages/user-area/user-area.module#UserAreaPageModule',
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

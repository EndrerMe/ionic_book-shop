// Vendors
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AdminTabsPage } from 'src/app/tabs/admin-tabs/admin-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'catalog',
        redirectTo: '/main/catalog',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadChildren: 'src/app/pages/admin/users/users.module#UsersPageModule'
      },
      {
        path: 'books',
        loadChildren: 'src/app/pages/admin/books/books.module#BooksPageModule'
      },
      {
        path: 'authors',
        loadChildren: 'src/app/pages/admin/authors/authors.module#AuthorsPageModule'
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminTabsPageRoutingModule {}

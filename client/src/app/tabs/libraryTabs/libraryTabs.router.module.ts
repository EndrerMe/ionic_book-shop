// Vendors
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LibraryTabsPage } from 'src/app/tabs/libraryTabs/libraryTabs.page';

const routes: Routes = [
  {
    path: 'main',
    component: LibraryTabsPage,
    children: [
      {
        path: 'catalog',
        loadChildren: 'src/app/pages/library/catalog/catalog.module#CatalogPageModule'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'main/catalog',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'shopping-bag',
    redirectTo: 'shopping-bag',
    pathMatch: 'full'
  },
  {
    path: 'admin-buns',
    redirectTo: 'admin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LibraryTabsPageRoutingModule {}

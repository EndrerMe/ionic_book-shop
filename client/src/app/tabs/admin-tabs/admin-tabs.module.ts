// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
// Comonents
import { AdminTabsPage } from 'src/app/tabs/admin-tabs/admin-tabs.page';
// Routers
import { AdminTabsPageRoutingModule } from 'src/app/tabs/admin-tabs/admin-tabs-router.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTabsPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminTabsPage
  ]
})
export class AdminPageModule {}

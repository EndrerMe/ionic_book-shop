// Vendors
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
// Components
import { AuthTabsPage } from 'src/app/tabs/auth-tabs/auth-tabs.page';
// Routers
import { AuthPageRoutingModule } from 'src/app/tabs/auth-tabs/auth-tabs-router.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    SharedModule,
  ],
  declarations: [AuthTabsPage]
})
export class AuthPageModule {}

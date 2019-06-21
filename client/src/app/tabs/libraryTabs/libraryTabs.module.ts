// Vendors
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { LibraryTabsPageRoutingModule } from 'src/app/tabs/libraryTabs/libraryTabs.router.module';
import { SharedModule } from 'src/app/shared/shared.module';
// Pages
import { LibraryTabsPage } from 'src/app/tabs/libraryTabs/libraryTabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LibraryTabsPageRoutingModule,
    SharedModule
  ],
  declarations: [LibraryTabsPage]
})
export class LibraryTabsPageModule {}

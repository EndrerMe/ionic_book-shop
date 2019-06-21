import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AlertService } from './services/alert.service';
import { WithSideMenuComponent } from './directives/with-side-menu/with-side-menu.component';
import { WithoutSideMenuComponent } from './directives/without-side-menu/without-side-menu.component';
import { IonicModule } from '@ionic/angular';
import { RefreshComponent } from './directives/refresh/refresh.component';
import { GridModule } from '@progress/kendo-angular-grid';


@NgModule ({
    imports: [
        ReactiveFormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        IonicModule,
        GridModule,
    ],
    declarations: [
        WithSideMenuComponent,
        WithoutSideMenuComponent,
        RefreshComponent
    ],
    exports: [
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
        WithSideMenuComponent,
        WithoutSideMenuComponent,
        IonicModule,
        RefreshComponent,
        GridModule,
    ],
    providers: [
        AlertService
    ]
})

export class SharedModule {}

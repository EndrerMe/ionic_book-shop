// Services
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IonicModule } from '@ionic/angular';
import { GridModule } from '@progress/kendo-angular-grid';

// Services
import { AlertService } from 'src/app/shared/services/alert.service';
// Components
import { WithSideMenuComponent } from 'src/app/shared/directives/with-side-menu/with-side-menu.component';
import { WithoutSideMenuComponent } from 'src/app/shared/directives/without-side-menu/without-side-menu.component';
import { RefreshComponent } from 'src/app/shared/directives/refresh/refresh.component';


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

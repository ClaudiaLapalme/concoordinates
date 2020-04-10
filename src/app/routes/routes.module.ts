import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { RoutesPageRoutingModule } from './routes-routing.module';
import { RoutesPage } from './routes.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RoutesPageRoutingModule,
        ReactiveFormsModule,
        CoreModule
    ],
    declarations: [RoutesPage, RoutesListComponent]
})
export class RoutesPageModule {}

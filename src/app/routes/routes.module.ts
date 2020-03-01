import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from '../core';
import { RoutesListItemStepComponent } from './components/routes-list-item-step/routes-list-item-step.component';
import { RoutesListItemComponent } from './components/routes-list-item/routes-list-item.component';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { TransitLineIndicatorComponent } from './components/transit-line-indicator/transit-line-indicator.component';
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
  declarations: [
    RoutesPage,
    RoutesListComponent,
    RoutesListItemComponent,
    RoutesListItemStepComponent,
    TransitLineIndicatorComponent ]
})
export class RoutesPageModule {}

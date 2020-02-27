import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesListItemComponent } from './components/routes-list-item/routes-list-item.component';
import { RoutesListItemStepComponent } from './components/routes-list-item-step/routes-list-item-step.component';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { RoutesPageRoutingModule } from './routes-routing.module';

import { RoutesPage } from './routes.page';
import { ReactiveFormsModule }         from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RoutesPage, RoutesListComponent, RoutesListItemComponent, RoutesListItemStepComponent ]
})
export class RoutesPageModule {}

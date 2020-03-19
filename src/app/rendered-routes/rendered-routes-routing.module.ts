import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenderedRoutesPage } from './rendered-routes.page';

const routes: Routes = [
  {
    path: '',
    component: RenderedRoutesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenderedRoutesPageRoutingModule {}

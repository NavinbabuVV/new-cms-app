import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProceedCartPage } from './proceed-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ProceedCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProceedCartPageRoutingModule {}

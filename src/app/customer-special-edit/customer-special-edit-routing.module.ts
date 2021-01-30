import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSpecialEditPage } from './customer-special-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSpecialEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSpecialEditPageRoutingModule {}

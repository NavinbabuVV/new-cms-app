import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GccPage } from './gcc.page';

const routes: Routes = [
  {
    path: '',
    component: GccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GccPageRoutingModule {}

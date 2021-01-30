import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewalPage } from './renewal.page';

const routes: Routes = [
  {
    path: '',
    component: RenewalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiallerPage } from './dialler.page';

const routes: Routes = [
  {
    path: '',
    component: DiallerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiallerPageRoutingModule {}

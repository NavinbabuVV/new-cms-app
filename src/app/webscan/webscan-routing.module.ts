import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebscanPage } from './webscan.page';

const routes: Routes = [
  {
    path: '',
    component: WebscanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebscanPageRoutingModule {}

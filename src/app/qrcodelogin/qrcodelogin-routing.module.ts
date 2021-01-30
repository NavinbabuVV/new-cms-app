import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrcodeloginPage } from './qrcodelogin.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodeloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodeloginPageRoutingModule {}

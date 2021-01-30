import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanpagePage } from './scanpage.page';

const routes: Routes = [
  {
    path: '',
    component: ScanpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanpagePageRoutingModule {}

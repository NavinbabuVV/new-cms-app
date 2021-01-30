import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseKeySearchPage } from './license-key-search.page';

const routes: Routes = [
  {
    path: '',
    component: LicenseKeySearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenseKeySearchPageRoutingModule {}

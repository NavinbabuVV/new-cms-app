import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalSearchResultPage } from './global-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: GlobalSearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalSearchResultPageRoutingModule {}

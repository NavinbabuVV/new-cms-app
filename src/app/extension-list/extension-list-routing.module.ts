import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtensionListPage } from './extension-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExtensionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtensionListPageRoutingModule {}

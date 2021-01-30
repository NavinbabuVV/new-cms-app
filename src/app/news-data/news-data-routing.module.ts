import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsDataPage } from './news-data.page';

const routes: Routes = [
  {
    path: '',
    component: NewsDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsDataPageRoutingModule {}

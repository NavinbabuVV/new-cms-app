import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewseventsPage } from './newsevents.page';

const routes: Routes = [
  {
    path: '',
    component: NewseventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewseventsPageRoutingModule {}

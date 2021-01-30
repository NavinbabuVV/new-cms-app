import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuotationCommentsPage } from './quotation-comments.page';

const routes: Routes = [
  {
    path: '',
    component: QuotationCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationCommentsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayCurrencyPage } from './today-currency.page';

const routes: Routes = [
  {
    path: '',
    component: TodayCurrencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayCurrencyPageRoutingModule {}

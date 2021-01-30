import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { ComponentsModule } from '../components/components.module';
// import { TermsPageModule } from '../terms/terms.module';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ComponentsModule,
    // TermsPageModule,
  ],
  declarations: [DashboardPage,]
})
export class DashboardPageModule {}

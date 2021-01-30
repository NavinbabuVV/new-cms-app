import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResellerManagementPageRoutingModule } from './reseller-management-routing.module';

import { ResellerManagementPage } from './reseller-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResellerManagementPageRoutingModule
  ],
  declarations: [ResellerManagementPage]
})
export class ResellerManagementPageModule {}

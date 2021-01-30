import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccManagePageRoutingModule } from './acc-manage-routing.module';

import { AccManagePage } from './acc-manage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccManagePageRoutingModule
  ],
  declarations: [AccManagePage]
})
export class AccManagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerSpecialEditPageRoutingModule } from './customer-special-edit-routing.module';

import { CustomerSpecialEditPage } from './customer-special-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerSpecialEditPageRoutingModule
  ],
  declarations: [CustomerSpecialEditPage]
})
export class CustomerSpecialEditPageModule {}

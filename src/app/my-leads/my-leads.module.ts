import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLeadsPageRoutingModule } from './my-leads-routing.module';

import { MyLeadsPage } from './my-leads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLeadsPageRoutingModule
  ],
  declarations: [MyLeadsPage]
})
export class MyLeadsPageModule {}

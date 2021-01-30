import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnquiryManagementPageRoutingModule } from './enquiry-management-routing.module';

import { EnquiryManagementPage } from './enquiry-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnquiryManagementPageRoutingModule
  ],
  declarations: [EnquiryManagementPage]
})
export class EnquiryManagementPageModule {}

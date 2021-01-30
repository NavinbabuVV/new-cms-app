import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotationCommentsPageRoutingModule } from './quotation-comments-routing.module';

import { QuotationCommentsPage } from './quotation-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotationCommentsPageRoutingModule
  ],
  declarations: [QuotationCommentsPage]
})
export class QuotationCommentsPageModule {}

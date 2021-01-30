import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtensionListPageRoutingModule } from './extension-list-routing.module';

import { ExtensionListPage } from './extension-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtensionListPageRoutingModule
  ],
  declarations: [ExtensionListPage]
})
export class ExtensionListPageModule {}

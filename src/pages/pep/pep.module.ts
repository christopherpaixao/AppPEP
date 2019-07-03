import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PepPage } from './pep';

@NgModule({
  declarations: [
    PepPage,
  ],
  imports: [
    IonicPageModule.forChild(PepPage),
  ],
})
export class PepPageModule {}

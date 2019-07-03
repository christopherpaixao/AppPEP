import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CtaPage } from './cta';

@NgModule({
  declarations: [
    CtaPage,
  ],
  imports: [
    IonicPageModule.forChild(CtaPage),
  ],
})
export class CtaPageModule {}

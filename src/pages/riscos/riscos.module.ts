import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiscosPage } from './riscos';

@NgModule({
  declarations: [
    RiscosPage,
  ],
  imports: [
    IonicPageModule.forChild(RiscosPage),
  ],
})
export class RiscosPageModule {}

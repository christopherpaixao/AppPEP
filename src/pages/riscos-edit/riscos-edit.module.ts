import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiscosEditPage } from './riscos-edit';

@NgModule({
  declarations: [
    RiscosEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RiscosEditPage),
  ],
})
export class RiscosEditPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacienteEditPage } from './paciente-edit';

@NgModule({
  declarations: [
    PacienteEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PacienteEditPage),
  ],
})
export class PacienteEditPageModule {}

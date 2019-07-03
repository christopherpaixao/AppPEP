import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPacientePage } from './login-paciente';

@NgModule({
  declarations: [
    LoginPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPacientePage),
  ],
})
export class LoginPacientePageModule {}

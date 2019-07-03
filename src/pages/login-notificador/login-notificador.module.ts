import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginNotificadorPage } from './login-notificador';

@NgModule({
  declarations: [
    LoginNotificadorPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginNotificadorPage),
  ],
})
export class LoginNotificadorPageModule {}

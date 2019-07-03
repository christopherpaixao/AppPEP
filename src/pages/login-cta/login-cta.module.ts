import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginCtaPage } from './login-cta';

@NgModule({
  declarations: [
    LoginCtaPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginCtaPage),
  ],
})
export class LoginCtaPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificadorPage } from './notificador';

@NgModule({
  declarations: [
    NotificadorPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificadorPage),
  ],
})
export class NotificadorPageModule {}

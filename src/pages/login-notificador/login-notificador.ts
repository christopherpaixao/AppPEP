import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/auth-service/user';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { SignupPage } from '../signup/signup';
import { ResetsenhaPage } from '../resetsenha/resetsenha';
import { NotificadorPage } from '../notificador/notificador';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginNotificadorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-notificador',
  templateUrl: 'login-notificador.html',
})
export class LoginNotificadorPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider) {

  }

  /** createAccount() {
    this.navCtrl.push(SignupPage);
  }*/

  resetPassword(){
    this.navCtrl.push(ResetsenhaPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot(NotificadorPage);
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é valida.');
          }
          toast.present();
        });
    }
  }

  openNotificador(){
    this.navCtrl.push(NotificadorPage, {}, {animate: true});
  }
  homeBtn(){
    this.navCtrl.push(HomePage, {}, {animate: true});
  }
}

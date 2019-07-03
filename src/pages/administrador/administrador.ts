import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { SignupPage } from '../signup/signup';
import { ResetsenhaPage } from '../resetsenha/resetsenha';
import { User } from '../../providers/auth-service/user';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthServiceProvider,
              private toastCtrl: ToastController, ) {
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }

  resetPassword(){
    this.navCtrl.push(ResetsenhaPage);
  }

  signIn() {
    if (this.form.form.valid) {
      this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot(AdministradorPage);
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

 /** abrirCTA(){
    this.navCtrl.push(CtaPage, {}, {animate: true});
  }
  homeBtn(){
    this.navCtrl.push(HomePage, {}, {animate: true});
  }*/ 

}

import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { NotificadorPage} from '../notificador/notificador';
import { SignupPage } from '../signup/signup';
import { ResetsenhaPage } from '../resetsenha/resetsenha';
import { User } from '../../providers/auth-service/user';
import { NgForm } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginNotificadorPage } from '../login-notificador/login-notificador';
import { LoginCtaPage } from '../login-cta/login-cta';
import { LoginAdminPage } from '../login-admin/login-admin';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  message: any;
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    public emailComposer: EmailComposer) {

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

   //função para chamada ao clicar no botão da home
   openNotificador(){
    this.navCtrl.push(LoginNotificadorPage, {}, {animate: true});
  }

  abrirCTA(){
    this.navCtrl.push(LoginCtaPage, {}, {animate: true});
  }
  abrirAdmin(){
    this.navCtrl.push(LoginAdminPage, {}, {animate: true});
  }

  abrirEmailComposer(){
    this.emailComposer.open({
      to:'cpaixaoneto@gmail.com'
    })
  }
 

/*   send(){
    this.sms.send('94981407602', this.message)
      .then(()=>{
        let toast = this.toastCtrl.create({
          message: 'Message send successfully',
          duration: 3000        });
        toast.present();
      },()=>{
        let toast = this.toastCtrl.create({
          message: 'Failure',
          duration: 3000        });
        toast.present();
      });
  } */



}
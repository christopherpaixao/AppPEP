import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PacienteProvider } from '../../providers/paciente/paciente';
import { App } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cta',
  templateUrl: 'cta.html',
})
export class CtaPage {

  pacientes: Observable<any>;
 


  constructor(public navCtrl: NavController,public navParams: NavParams, private provider: PacienteProvider,
    private toast: ToastController, private alertCtrl: AlertController,  public appCtrl: App) {

    this.pacientes = this.provider.getAll();
    //console.log("Código: " + this.pacientes);

  }

  newPEP() {
    this.navCtrl.push('CtaDadosPage');
  }

  editPEP(paciente: any) {
    // Maneira 1
    //this.navCtrl.push('PacienteEditPage', { paciente: paciente });
 
    // Maneira 2
    this.navCtrl.push('CtaDadosPage', { key: paciente.key });
  }

  removePEP(key: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você deseja remover este PEP?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada.');
          }
        },
        {
          text: 'Confirmar',
handler: () => {

    if (key) {
      this.provider.removePEP(key)
        .then(() => {
          this.toast.create({ message: 'PEP removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o PEP.', duration: 3000 }).present();
        });
    }
  }

}
]
});
alert.present();
}

 abrirPEP(paciente: any){
    this.navCtrl.push('PepPage', { paciente: paciente });
  }

  
  logOutCta(e){
    console.log('Chamou o Logout');
    this.appCtrl.getRootNav().setRoot(HomePage);
 }


}

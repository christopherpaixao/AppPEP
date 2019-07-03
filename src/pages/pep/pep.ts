import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { PacienteProvider } from '../../providers/paciente/paciente';

@IonicPage()
@Component({
  selector: 'page-pep',
  templateUrl: 'pep.html',
})
export class PepPage {

  paciente: any;
  pep: Observable<any>;
  userKey: string;

  constructor(public navCtrl: NavController,public navParams: NavParams, private provider: PacienteProvider,
    private toast: ToastController, private alertCtrl: AlertController) {

    this.paciente = this.navParams.data.paciente || {}
    this.userKey = this.paciente.key;
    this.funcionaPEP(this.userKey);
    //this.paciente = this.provider.getRiscos(this.userKey);
    //console.log("Código: " + this.riscos);

  }

  newPEP(paciente: any) {
    this.navCtrl.push('CtaDadosPage', { paciente: paciente });
  }

  editPEP(pep: any) {
    this.navCtrl.push('CtaDadosPage', { pep: pep});
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

funcionaPEP(key: string) {
  this.pep = this.provider.getPEP(key);
}

}

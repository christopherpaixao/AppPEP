import { PacienteProvider } from '../../providers/paciente/paciente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-riscos',
  templateUrl: 'riscos.html',
})
export class RiscosPage {

  paciente: any;
  riscos: Observable<any>;
  userKey: string;

  constructor(public navCtrl: NavController,public navParams: NavParams, private provider: PacienteProvider,
    private toast: ToastController, private alertCtrl: AlertController) {

    this.paciente = this.navParams.data.paciente || {}
    this.userKey = this.paciente.key;
    this.funcionaCaralho(this.userKey);
    //this.paciente = this.provider.getRiscos(this.userKey);
    //console.log("Código: " + this.riscos);

  }

  newRisco(paciente: any) {
    this.navCtrl.push('RiscosEditPage', { paciente: paciente });
  }

  editRisco(risco: any) {
    this.navCtrl.push('RiscosEditPage', { risco: risco});
  }

  removeRisco(key: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você deseja remover este risco?',
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
      this.provider.removeRiscos(key)
        .then(() => {
          this.toast.create({ message: 'Risco removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o Risco.', duration: 3000 }).present();
        });
    }
  }

}
]
});
alert.present();
}

funcionaCaralho(key: string) {
  this.riscos = this.provider.getRiscos(key);
}

}

import { PacienteProvider } from './../../providers/paciente/paciente';
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { App } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-notificador',
  templateUrl: 'notificador.html',
})
export class NotificadorPage {
  pacientes: Observable<any>;
 


  constructor(public navCtrl: NavController,public navParams: NavParams, private provider: PacienteProvider,
    private toast: ToastController, private alertCtrl: AlertController, public appCtrl: App) {

    this.pacientes = this.provider.getAll();
    //console.log("Código: " + this.pacientes);

  }

  newPaciente() {
    this.navCtrl.push('PacienteEditPage');
  }

  editPaciente(paciente: any) {
    // Maneira 1
    //this.navCtrl.push('PacienteEditPage', { paciente: paciente });
 
    // Maneira 2
    this.navCtrl.push('PacienteEditPage', { key: paciente.key });
  }

  removePaciente(key: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar Exclusão',
      message: 'Você deseja remover este paciente?',
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
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Paciente removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o Paciente.', duration: 3000 }).present();
        });
    }
  }

}
]
});
alert.present();
}

 abrirRiscos(paciente: any){
    this.navCtrl.push('RiscosPage', { paciente: paciente });
  }

  logOutNotificador(e){
    console.log('Chamou o Logout');
    this.appCtrl.getRootNav().setRoot(HomePage);
 }

}

import { PacienteProvider } from '../../providers/paciente/paciente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-riscos-edit',
  templateUrl: 'riscos-edit.html',
})
export class RiscosEditPage {
  //variáveis
  //consulta: Observable<any>;
  title: string;
  formRiscos: FormGroup;
  risco: any;
  paciente: any;
  busca: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: PacienteProvider,
    private toast: ToastController, private alertCtrl: AlertController) {
      this.paciente = this.navParams.data.paciente || {};
      this.risco = this.navParams.data.risco || {};
      //console.log("Página Riscos: " + JSON.stringify(this.paciente));
      this.createForm();
      this.setupPageTitle();
    }
private setupPageTitle() {
  this.title = this.navParams.data.risco ? 'Alterando risco' : 'Cadastrar Risco';
}

//criando método createForm
createForm() {
  this.formRiscos = this.formBuilder.group({
    key: [this.risco.key],
    pacienteKey: [this.paciente.key],
    matBiologico: [this.risco.matBiologico],
    tipoExposicao: [this.risco.tipoExposicao],
    tempoExposicao: [this.risco.tempoExposicao],
    pessoaExposta: [this.risco.pessoaExposta]     
  });
}

//Salvar alteração
enviaRisco() {
  
    if (this.formRiscos.valid)  {  
           
    this.provider.saveRiscos(this.formRiscos.value)
      .then(() => {
        //this.toast.create({ message: 'risco salvo com sucesso.', duration: 3000 }).present();
        if (this.formRiscos.value.matBiologico == "Sim" && this.formRiscos.value.tipoExposicao == "Sim"
          && this.formRiscos.value.tempoExposicao == "Sim" && this.formRiscos.value.pessoaExposta == "Sim"){
          //this.toast.create({message: 'Não indicar PEP', duration: 3000}).present();
          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: 'Indicação de PEP para o Paciente',
            buttons: ['Ok']
          });
          alert.present();
          
        }else if(this.formRiscos.value.pessoaExposta == "Não"){
          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: 'Encaminhar paciente para CTA',
            buttons: ['Ok']
          });
          alert.present();
        }else if (this.formRiscos.value.matBiologico == "Não" || this.formRiscos.value.tipoExposicao == "Não"
        || this.formRiscos.value.tempoExposicao == "Não"){
          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: 'Não indicar PEP',
            buttons: ['Ok']
          });
          alert.present();

        }
        
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o risco.', duration: 3000 }).present();
        console.error(e);
      });
          
  }
}


/*enviaRisco() {
  if (this.formRiscos.valid)  {
    this.provider.saveRiscos(this.formRiscos.value)
      .then(() => {
        this.toast.create({ message: 'risco salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o risco.', duration: 3000 }).present();
        console.error(e);
      })
  }
}*/


/************** Métodos Seleção *************/

}

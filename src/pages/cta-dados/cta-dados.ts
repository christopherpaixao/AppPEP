import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PacienteProvider } from '../../providers/paciente/paciente';


@IonicPage()
@Component({
  selector: 'page-cta-dados',
  templateUrl: 'cta-dados.html',
})
export class CtaDadosPage {

  //variáveis
  title: string;
  formPEP: FormGroup;
  pep: any;
  paciente: any;
  busca: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: PacienteProvider,
    private toast: ToastController) {
      this.paciente = this.navParams.data.paciente || {};
      this.pep = this.navParams.data.pep || {};
      //console.log("Página pep: " + JSON.stringify(this.paciente));
      this.createForm();
      this.setupPageTitle();
    }
private setupPageTitle() {
  this.title = this.navParams.data.pep ? 'Alterando pep' : 'Cadastrar pep';
}

//criando método createForm
createForm() {
  this.formPEP = this.formBuilder.group({
    key: [this.pep.key],
    pacienteKey: [this.paciente.key],
    dataEntregaPEP: [this.pep.dataEntregaPEP],
    resultadoTrinta: [this.pep.resultadoTrinta],
    resultadoNoventa: [this.pep.resultadoNoventa],
    
  });
}

enviaPEP() {
  if (this.formPEP.valid)  {
    this.provider.savePEP(this.formPEP.value)
      .then(() => {
        this.toast.create({ message: 'PEP salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o risco.', duration: 3000 }).present();
        console.error(e);
      })
  }
}

}

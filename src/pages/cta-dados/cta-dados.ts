import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PacienteProvider } from '../../providers/paciente/paciente';
import { EmailComposer } from '@ionic-native/email-composer';


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
  emailPaciente: any;
/*   dataEntregaPEP: '';
  resultadoTrinta: '';
  resultadoNoventa: ''; */

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: PacienteProvider,
    private toast: ToastController, public emailComposer: EmailComposer) {
      this.paciente = this.navParams.data.paciente || {};
      this.pep = this.navParams.data.pep || {};
      this.emailPaciente = this.navParams.data.paciente.email|| {};
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
    //envio email
    let email = {
    to: this.emailPaciente,
    cc: 'christopher.paixao@hotmail.com',
    bcc: [],
    attachments: [],
    subject: 'TESTE envio Resultado PEP',
    body: 'Informamos o resultado dos exames do seu PEP'+'<br/><br/>'+
    'Data da entrega: '+this.formPEP.value.dataEntregaPEP+'<br/>'+
    'Resultado de 30 dias: '+this.formPEP.value.resultadoTrinta +'<br/>'+
    'Resultado de 90 dias: '+this.formPEP.value.resultadoNoventa,
    isHtml: true,
    app: "gmail"
  }
  // Send a text message using default options
    this.emailComposer.open(email);
    
    
  }
}

}

/* if (this.formPEP.valid){
  //envio email
  let email = {
    to: 'christopherpaixao93@gmail.com',
    cc: 'cpaixaoneto@gmail.com',
    bcc: [],
    attachments: [],
    subject: 'Resultado PEP',
    body: 'Data da entrega' + this.pep.dataEntregaPEP + 'Resultado de 30 dias' + this.pep.resultadoTrinta
    + 'Resultado de 90 dias' + this.pep.resultadoNoventa,
    isHtml: true,
    app: "Gmail"
  }
  
  // Send a text message using default options
  this.emailComposer.open(email);
  console.log(email);
} */

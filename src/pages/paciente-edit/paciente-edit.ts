import {PacienteProvider} from './../../providers/paciente/paciente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';



@IonicPage()

@Component({
  selector: 'page-paciente-edit',
  templateUrl: 'paciente-edit.html',
})
export class PacienteEditPage {
  //variáveis
  title: string;
  form: FormGroup;
  paciente: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: PacienteProvider,
    private toast: ToastController, public toastCtrl: ToastController) {
 
    /*this.paciente = this.navParams.data.paciente || { };
    this.createForm();*/
    //maneira 2
     this.paciente = { };
     this.createForm();
 
     if (this.navParams.data.key) {
       const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
         subscribe.unsubscribe();
 
         this.paciente = c;
         this.createForm();
       })
     }
    
    
    this.setupPageTitle();
}

//criando método setupPageTitle
private setupPageTitle() {
  this.title = this.navParams.data.paciente ? 'Alterando paciente' : 'Novo Paciente';
}

//criando método createForm
createForm() {
  this.form = this.formBuilder.group({
    key: [this.paciente.key],
    name: [this.paciente.name, Validators.required],
    dn: [this.paciente.dn, Validators.required],
    fone: [this.paciente.fone, Validators.required],
    email: [this.paciente.email],
    nomemae: [this.paciente.nomemae, Validators.required],
    cidade: [this.paciente.cidade, Validators.required],
    dataacidente: [this.paciente.dataacidente, Validators.required],
    horaacidente: [this.paciente.horaacidente, Validators.required]
    });
}

//Salvar alteração
onSubmit() {
  if (this.form.valid) {
    this.provider.save(this.form.value)
      .then((user: any) => {
        //user.sendEmailVerification();
        this.toast.create({ message: 'Paciente salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o Paciente.', duration: 3000 }).present();
        console.error(e);
      })
  }
}


 

}

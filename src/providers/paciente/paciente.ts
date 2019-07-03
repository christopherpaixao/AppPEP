import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
//import 'rxjs/add/operator/map';

@Injectable()
export class PacienteProvider {

  private PATH = 'pacientes/';
  //private pacientesList = this.db.list<Pacientes>('pacientes-list')
  private riscosPATH = 'riscos/';
  private pepPATH = 'cta/';

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
    .snapshotChanges().map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    });
  }
  
 get(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(p => {
        return { key: p.key, ...p.payload.val() };
      });
  }

  save(paciente: any) {
    return new Promise((resolve, reject) => {
      if (paciente.key) {
        this.db.list(this.PATH)
          .update(paciente.key, {
            name: paciente.name,
            dn: paciente.dn,
            fone: paciente.fone,
            nomemae: paciente.nomemae,
            cidade: paciente.cidade,
            dataacidente: paciente.dataacidente,
            horaacidente: paciente.horaacidente,
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            name: paciente.name,
            dn: paciente.dn,
            fone: paciente.fone,
            nomemae: paciente.nomemae,
            cidade: paciente.cidade,
            dataacidente: paciente.dataacidente,
            horaacidente: paciente.horaacidente,
          })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }


  /*------------ Dados Riscos ------------*/
  getRiscos(key: string){
    return this.db.list(this.riscosPATH, ref => ref.orderByChild('pacienteKey').equalTo(key))
    .snapshotChanges()
    .map(changes => {
      return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
    });
  }
  

  removeRiscos(key: string) {
    return this.db.list(this.riscosPATH).remove(key);
  }

  saveRiscos(riscos: any) {
    return new Promise((resolve, reject) => {
      if (riscos.key) {
        this.db.list(this.riscosPATH)
          .update(riscos.key, {   
            matBiologico: riscos.matBiologico,
            tipoExposicao: riscos.tipoExposicao,
            tempoExposicao: riscos.tempoExposicao,
            pessoaExposta: riscos.pessoaExposta
            /** pessoaFonte: riscos.pessoaFonte,
            resultExame: riscos.resultExame*/
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.riscosPATH)
          .push({
            pacienteKey: riscos.pacienteKey,
            matBiologico: riscos.matBiologico,
            tipoExposicao: riscos.tipoExposicao,
            tempoExposicao: riscos.tempoExposicao,
            pessoaExposta: riscos.pessoaExposta
            /** pessoaFonte: riscos.pessoaFonte,
            resultExame: riscos.resultExame*/
          })
          .then(() => resolve());
      }
    })
  }

  /*------------ Fim dados Riscos ------------*/

    /*------------ Dados PEP------------*/
    getPEP(key: string){
      return this.db.list(this.pepPATH, ref => ref.orderByChild('pacienteKey').equalTo(key))
      .snapshotChanges()
      .map(changes => {
        return changes.map(p => ({ key: p.payload.key, ...p.payload.val() }));
      });
    }
    
  
    removePEP(key: string) {
      return this.db.list(this.pepPATH).remove(key);
    }
  
    savePEP(pep: any) {
      return new Promise((resolve, reject) => {
        if (pep.key) {
          this.db.list(this.pepPATH)
            .update(pep.key, {   
              dataEntregaPEP: pep.dataEntregaPEP,
              resultadoTrinta: pep.resultadoTrinta,
              resultadoNoventa: pep.resultadoNoventa,
            })
            .then(() => resolve())
            .catch((e) => reject(e));
        } else {
          this.db.list(this.pepPATH)
            .push({
              pacienteKey: pep.pacienteKey,
              dataEntregaPEP: pep.dataEntregaPEP,
              resultadoTrinta: pep.resultadoTrinta,
              resultadoNoventa: pep.resultadoNoventa,
            })
            .then(() => resolve());
        }
      })
    }
  
    /*------------ Fim dados PEP ------------*/

}

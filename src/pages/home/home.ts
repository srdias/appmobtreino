import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalVars } from '../../providers/GlobalVars';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { TreinoDetalhePage } from '../treino-detalhe/treino-detalhe';
import { TreinoPage } from '../treino/treino';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string;
  treinoDia: { descricao: string, semanaU: string, diaCompleto: string };
  outros: { semfeedback: number, eventosemconfirmacao: number };

  constructor(public navCtrl: NavController, public http: Http, 
    public globalVars: GlobalVars, public loadingCtrl: LoadingController,
     public toastCtrl: ToastController) {

    this.treinoDia = { "descricao": "", "semanaU": "", "diaCompleto": "" };
    this.outros = { "semfeedback": 0, "eventosemconfirmacao": 0 };
    this.globalVars.lerDadosRemoto(this.http, this.toastCtrl, this.loadingCtrl, this);

  }

  refreshInfo() {
    this.treinoDia = this.globalVars.getTreinoDia();
    this.outros = this.globalVars.outros;
  }

  treinoTapped(event, item) {
    this.navCtrl.push(TreinoDetalhePage, {
      item: item
    });
  }

  listaTreinoTapped(event){
    this.navCtrl.push(TreinoPage, {});
  }

}

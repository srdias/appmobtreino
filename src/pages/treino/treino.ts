import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TreinoDetalhePage } from '../treino-detalhe/treino-detalhe';
import { GlobalVars } from '../../providers/GlobalVars';

@Component({
  selector: 'page-treino',
  templateUrl: 'treino.html'
})
export class TreinoPage {
  items: Array<{ dia: string, semana: string, situacao: number, feedbackTexto: string, timeline: number, modalidade: number }>;

  constructor(public navCtrl: NavController, public http: Http, public globalVars: GlobalVars) {
    /*
        this.http.get('http://192.168.0.109:8080/produtividade/rest/listaTreinos/'+globalVars.getToken()).map(res => res.json()).subscribe(data => {
          this.items = data.treinos;
        });
    */
    this.items = globalVars.treinos;
    

  }

  itemTapped(event, item) {
    this.navCtrl.push(TreinoDetalhePage, {
      item: item
    });
  }

}

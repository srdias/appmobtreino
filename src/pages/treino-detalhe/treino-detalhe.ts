import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { GlobalVars } from '../../providers/GlobalVars';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-treino-detalhe',
  templateUrl: 'treino-detalhe.html'
})
export class TreinoDetalhePage {
  usuario: string;
  email: string;
  items: Array<{ dia: string, semana: string, descricao: string, feedbackTexto: string, situacao: number }>;
  treino: { semana: string, dia: string, descricao: string };
  selectedItem: any;
  feedBackVisible: boolean;
  feedbackDados: { treino_id: number, texto: string, treino: any };

  @ViewChild('textFeedback') myInput;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public globalVars: GlobalVars, public toastCtrl: ToastController) {

    this.usuario = globalVars.usuario;
    this.selectedItem = navParams.get('item');
    this.items = [this.selectedItem]; 
    this.feedBackVisible = (this.items[0].situacao == 1);
    this.feedbackDados = { "treino_id": 0, "texto": this.items[0].feedbackTexto, "treino": {} };

  }

  itemTappedFeedback(event) {
    this.feedBackVisible = true;
    //alert(this.items[0].feedbackTexto);
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }

  itemTappedGravar(event, item) {
/*
    let toast = this.toastCtrl.create({
      message: 'Usuário ou senha inválido!!!',
      duration: 3000,
      position: "botton",
      cssClass: "msgErroLogin"
    });
*/
    this.feedbackDados.treino = item;

    var link = 'http://192.168.0.109:8080/produtividade/rest/listaTreinos/feedback/' + this.globalVars.getToken();
    var myData = JSON.stringify(this.feedbackDados);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    this.http.post(link, myData, { headers: headers })
      .subscribe(data => {
        //var retorno = data.json();
        this.globalVars.atualizaFeedback(this.feedbackDados.treino.id, this.feedbackDados.texto);
      }, error => {
        this.globalVars.mensagemErro(this.toastCtrl);
      });
  }
}

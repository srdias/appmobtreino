import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalVars } from '../../providers/GlobalVars';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  item : { usuario: string, senha: string };

  constructor(public navCtrl: NavController, public http: Http, public globalVars: GlobalVars, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.item = {
      "usuario": "teste02",
      "senha": "123"
    };
  }

  itemTapped(event) {

    let loading = this.loadingCtrl.create({
      content: 'Entrando...<br>Atleta M3 chegando na área....'
    });

    let toast = this.toastCtrl.create({
      message: 'Usuário ou senha inválido!!!',
      duration: 3000,
      position: "botton",
      cssClass: "msgErroLogin"
    });

    loading.present();

    var link = 'http://192.168.0.109:8080/produtividade/rest/auth/1';
    var myData = JSON.stringify(this.item);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');


    this.http.post(link, myData, { headers: headers })
      .subscribe(data => {
        var retorno = data.json();

        this.globalVars.setToken(retorno.token);
        this.globalVars.setLogged(retorno.autenticado);

        loading.dismiss();

        if (this.globalVars.isLogged()) {
          this.navCtrl.setRoot(HomePage);
        } else {
          toast.present();
        }

      }, error => {
        loading.dismiss();
        this.globalVars.mensagemErro(this.toastCtrl);
      });
  }

}

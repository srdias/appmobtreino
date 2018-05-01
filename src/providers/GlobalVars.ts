import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http } from '@angular/http';
import { MyApp } from '../app/app.component';
import { HomePage } from '../pages/home/home';

@Injectable()
export class GlobalVars {

    myApp: MyApp;
    token: string;
    logged: boolean;
    treinos: any;
    usuario: string;
    email: string;
    treinoDia: { id: number, descricao: string, semanaU: string, diaCompleto: string };
    outros: { semfeedback: number, eventosemconfirmacao: number };

    constructor() {
        this.token = "";
        this.logged = false;
    }

    setToken(value) {
        this.token = value;
    }

    setLogged(value) {
        this.logged = value;
    }

    getToken() {
        return this.token;
    }

    isLogged() {
        return this.logged;
    }

    mensagemErro(toastCtrl: ToastController) {
        toastCtrl.create({
            message: 'Erro de comunicação com o servidor!!!',
            duration: 5000,
            position: "botton",
            cssClass: "msgErroLogin"
        }).present();;
    }

    lerDadosRemoto(http: Http, toastCtrl: ToastController, loadingCtrl: LoadingController, homePage: HomePage) {

        let loading = loadingCtrl.create({
            content: 'Recebendo dados....'
        });

        loading.present();

        http.get('http://192.168.0.109:8080/produtividade/rest/listaTreinos/' + this.getToken()).map(res => res.json())
            .subscribe(data => {
                this.usuario = data.usuario;
                this.email = data.email;
                this.treinos = data.treinos;
                this.treinoDia = data.treinoDia;
                this.outros = {
                    "semfeedback": 0,
                    "eventosemconfirmacao": data.eventosemconfirmacao
                }
                this.myApp.refreshInfo();
                if (homePage != null) {
                    homePage.refreshInfo();
                }
                loading.dismiss();
                this.calcDadosTreinos();
            });
    }

    calcDadosTreinos() {
        let contaAtrasados = 0;
        for (let entry of this.treinos) {
            if (entry.feedbackTexto != undefined && entry.feedbackTexto!="") {
                entry.situacao = 1; //-- Com feedback
            } else {
                if (entry.modalidade == 4) {
                    entry.situacao = 2; //-- Folga
                } else {
                    if (entry.timeline == 3) {
                        contaAtrasados++;
                        entry.situacao = 3; //-- Atrasado
                    } else {
                        entry.situacao = 4; //-- Agendado
                    }
                }
            }
        }
        this.outros.semfeedback = contaAtrasados;
    }

    atualizaFeedback(treino_id: number, texto: string) {
        for (let entry of this.treinos) {
            if (entry.id == treino_id) {
                entry.feedbackTexto = texto;
            }
        }
        this.calcDadosTreinos();
    }

    getTreinoDia() {
        for (let entry of this.treinos) {
            if (entry.timeline==2) {
                return entry;
            }
        }
        return null;
    }

}
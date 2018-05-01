import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { TreinoPage } from '../pages/treino/treino';
import { TreinoDetalhePage } from '../pages/treino-detalhe/treino-detalhe';
import { LoginPage } from '../pages/login/login';
import { GlobalVars } from '../providers/GlobalVars';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TreinoPage,
    TreinoDetalhePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TreinoPage,
    TreinoDetalhePage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalVars,
    { 
      provide: ErrorHandler, 
      useClass: IonicErrorHandler 
    }
  ]
})
export class AppModule { }

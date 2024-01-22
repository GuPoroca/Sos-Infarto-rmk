import { AlterarSenhaPageModule } from '../pages/alterar-senha/alterar-senha.module';
import { PrevencaoPageModule } from '../pages/prevencao/prevencao.module';
import { SaibaMaisPageModule } from '../pages/saiba-mais/saiba-mais.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from './../providers/auth.service';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { SharedModule } from '../components/custom-logged-header/shared.module';
import { ContatosPageModule } from '../pages/contatos/contatos.module';
import { ChatService } from './../providers/chat.service';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from './../providers/message.service';
import { HistoricoClinicoPage } from './../pages/historico-clinico/historico-clinico';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { PrincipalPageModule } from '../pages/principal/principal.module';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { SinaisInfartoPage } from './../pages/sinais-infarto/sinais-infarto';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user.service';
import { MapPageModule } from '../pages/map/map.module';

import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { IonMaskModule } from '@pluritech/ion-mask';
import { SobrePageModule } from '../pages/sobre/sobre.module';
import { RecuperarSenhaPageModule } from '../pages/recuperar-senha/recuperar-senha.module';
//import { ClienteProvider } from './../providers/cliente';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyD_nR1rrDQl9XoZ5PfskgHbW_rH1D6HXxA",
  authDomain: "sosinfarto.firebaseapp.com",
  databaseURL: "https://sosinfarto-default-rtdb.firebaseio.com",
  storageBucket: "sosinfarto.appspot.com",
  messagingSenderId: "289416004813"
};

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    HomePage,
    HistoricoClinicoPage,
    MessageBoxComponent,
    MyApp,
    ProgressBarComponent,
    SigninPage,
    SignupPage,
    SinaisInfartoPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    ContatosPageModule,
    HttpClientModule,
    SaibaMaisPageModule,
    SharedModule,
    PrevencaoPageModule,
    AlterarSenhaPageModule,
    PrincipalPageModule,
    RecuperarSenhaPageModule,
    SobrePageModule,
    MapPageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonMaskModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    HistoricoClinicoPage,
    MyApp,
    SigninPage,
    SignupPage,
    SinaisInfartoPage,
    UserProfilePage,
  ],
  providers: [
    AuthService,
    InAppBrowser,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    CallNumber,
    //ClienteProvider
  ]
})
export class AppModule {}

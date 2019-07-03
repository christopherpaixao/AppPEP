import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NotificadorPage } from '../pages/notificador/notificador';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ResetsenhaPage } from '../pages/resetsenha/resetsenha';
import { CtaPage } from '../pages/cta/cta';
import { LoginNotificadorPage } from '../pages/login-notificador/login-notificador';
import { LoginCtaPage } from '../pages/login-cta/login-cta';

import { PacienteProvider } from '../providers/paciente/paciente';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SigninWithEmailPage } from '../pages/signinwithemail/signinwithemail';

import { TextMaskModule } from 'angular2-text-mask';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AdministradorPage } from '../pages/administrador/administrador';
import { LoginAdminPage } from '../pages/login-admin/login-admin';
import { SMS } from '@ionic-native/sms/ngx';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NotificadorPage,
    SigninPage,
    CtaPage,
    LoginNotificadorPage,
    LoginCtaPage,
    ResetsenhaPage,
    SigninWithEmailPage,
    SignupPage,
    AdministradorPage,
    LoginAdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificadorPage,
    SigninPage,
    CtaPage,
    LoginNotificadorPage,
    LoginCtaPage,
    ResetsenhaPage,
    SigninWithEmailPage,
    SignupPage,
    AdministradorPage,
    LoginAdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PacienteProvider,
    AuthServiceProvider,
    Firebase,
    SMS,
    FcmProvider
  ]
})
export class AppModule {}

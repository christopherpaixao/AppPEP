import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    toastCtrl: ToastController,
    fcm: FcmProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      /*firebase.getToken().then(token => console.log(token)).catch(err => console.log(err));
      firebase.onNotificationOpen().subscribe(data => {
        console.log(data);
        console.log(data.name)
      }, err => console.log(err));*/

      // Get a FCM token
      fcm.getToken()

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()
    });
  }
}


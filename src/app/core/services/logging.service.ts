import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
/* import { Plugins } from '@capacitor/core';
const { Toast } = Plugins; */

@Injectable()
export class LoggingService {

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) { }

  async log(message: string, showToast: boolean) {
    console.log('LOG', message);
    if (showToast) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      /* await Toast.show({
        text: message,
        duration: 'short'
      }); */
    }

  }

  async logError(message: string) {
    console.log('LOG', message);
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}

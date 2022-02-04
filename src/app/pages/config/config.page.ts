import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  actived: boolean;
  avaliable: boolean;

  constructor(private faio: FingerprintAIO, private toastr: ToastService) { }

  ngOnInit() {
    this.setButton()
    this.availableButton();
  }

  async availableButton(){
    this.showFingerprintAuthDlg()
  }

  async setButton(){
    const { value } = await Storage.get({ key: 'credentials' });
    const credentials = JSON.parse(value || "0");
    const sessionCredentials = {
      username: sessionStorage.getItem('usuario'),
      password: sessionStorage.getItem('contrasena')
    }

    if(credentials != "0" && (credentials.username == sessionCredentials.username && 
      credentials.password == sessionCredentials.password)){
      this.actived = true;
    }
    else
      this.actived = false;
  }

  async infoConfig(){
    if(!this.actived){
      this.actived = true;

      const sessionCredentials = {
        username: sessionStorage.getItem('usuario'),
        password: sessionStorage.getItem('contrasena')
      }

      await Storage.remove({ key: 'credentials' });

      await Storage.set({
        key: 'credentials',
        value: JSON.stringify(sessionCredentials),
      });
    }
    else{
      this.actived = false;

      await Storage.remove({ key: 'credentials' });
    }
  }

  showFingerprintAuthDlg() {

    this.faio.isAvailable().then((result: any) => {
      this.toastr.toastr(result, "secondary", 5000);

      this.faio.show({
        cancelButtonTitle: 'Cancel',
        description: "Some biometric description",
        disableBackup: true,
        title: 'Scanner Title',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'This SubTitle'
      })
      .then((result: any) => {
        console.log(result)
        alert("Successfully Authenticated!")
      })
      .catch((error: any) => {
        console.log(error)
        alert("Match not found!")
      });
    })
    .catch((error: any) => {
      this.toastr.toastr(error, "danger", 5000);
    });
  }
}

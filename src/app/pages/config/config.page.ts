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
    this.availableButton();
  }

  async availableButton(){
    this.faio.isAvailable().then((result: any) => {      
      this.avaliable = true;
      this.setButton()
    })
    .catch((error: any) => {
      this.avaliable = false;
      this.toastr.toastr("La opción biometrica no esta disponible en este dispositivo.", "danger", 5000);
    });
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
}

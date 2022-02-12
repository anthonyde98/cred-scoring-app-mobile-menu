import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonContent } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  actived: boolean;
  avaliable: boolean;
  color:boolean;
  scroll: boolean = false;

  @ViewChild(IonContent) content: IonContent;

  constructor(private faio: FingerprintAIO, private toastr: ToastService,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.availableButton();
    this.setColorButton();
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

  async infoConfig(event){
    const sessionCredentials = {
      username: sessionStorage.getItem('usuario'),
      password: sessionStorage.getItem('contrasena')
    }

    if(event.detail.checked){
      this.actived = true;
      
      await Storage.remove({ key: 'credentials' });

      await Storage.set({
        key: 'credentials',
        value: JSON.stringify(sessionCredentials)
      });
    }
    else{
      const { value } = await Storage.get({ key: 'credentials' });
      const credentials = JSON.parse(value || "0");

      if(credentials != "0" && (credentials.username == sessionCredentials.username && 
        credentials.password == sessionCredentials.password)){
        await Storage.remove({ key: 'credentials' });
      }

      this.actived = false;
    }
  }

  async cambiarColor(event){
    await Storage.remove({ key: 'color-theme' });
    
    if(event.detail.checked){
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
      
      await Storage.set({
        key: 'color-theme',
        value: "dark"
      });
    }
    else{
      this.renderer.setAttribute(document.body, 'color-theme', 'light');

      await Storage.set({
        key: 'color-theme',
        value: "light"
      });
    }
  }

  async setColorButton(){
    const { value } = await Storage.get({ key: 'color-theme' });

    if(value == "dark")
      this.color = true;
    else
      this.color = false;
  }
  
  setScroll(event){
    if(event.detail.scrollTop > 0)  
      this.scroll = true;
    else
      this.scroll = false;
  }
}

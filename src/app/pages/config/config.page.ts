import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';



@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {
  actived: boolean;
  avaliable: boolean;

  constructor() { }

  ngOnInit() {
    this.setButton()
    this.availableButton();
  }

  async availableButton(){
    
  }

  async setButton(){
    const { value } = await Storage.get({ key: 'credentials' });
    const credentials = JSON.parse(value || "0");

    if(credentials != "0")
      this.actived = true;
    else
      this.actived = false;
  }

  async infoConfig(){
    if(!this.actived){
      this.actived = true;

      const credentials = {
        username: sessionStorage.getItem('usuario'),
        password: sessionStorage.getItem('contrasena')
      }
  
      await Storage.set({
        key: 'credentials',
        value: JSON.stringify(credentials),
      });
    }
    else{
      this.actived = false;

      await Storage.remove({ key: 'credentials' });
    }
  }
}

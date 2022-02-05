import { Component } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { ToastService } from './services/toast.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user = sessionStorage.getItem('usuario');
  ruta: boolean = true;
  public appPages = [
    { title: 'Información', url: 'informacion', icon: 'information-circle' },
    { title: 'Puntaje', url: 'puntaje', icon: 'star-half' },
    { title: 'Crédito actual', url: 'credito-actual', icon: 'time' },
    { title: 'Próximo crédito', url: 'siguiente-credito', icon: 'play-forward' },
    { title: 'Configuración', url: 'config', icon: 'settings' }
  ];

  constructor(private cs: ClienteService, private toastr: ToastService) {}

  ngOnInit() {
    if(sessionStorage['access_token'] == null && sessionStorage['auth_token'] == null)
      this.ruta = false;
    else{
      this.verificarTimepoAcceso();
      this.cs.setCliente(JSON.parse(sessionStorage.getItem('cliente') || '{}'))
    }
  }

  verificarTimepoAcceso(){
    if(sessionStorage['access_token'] != null && sessionStorage['auth_token'] != null){ 
      let fecha1 = moment(new Date(sessionStorage['fechaLogin']));
      let fecha2 = moment(new Date());

      let tiempo = fecha2.diff(fecha1, 'minutes');

      if((1140000 - (tiempo * 60000)) > 0){
        setTimeout(() => {
          this.toastr.toastr("Por seguridad, su sesión acabará en 1 minuto.", "warning", 5000);
        }, 1140000 - (tiempo * 60000));   
      }  
      setTimeout(() => {
        sessionStorage.clear();
        location.href = "/login";
      }, 1200000 - (tiempo * 60000));
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = "/login";
  }
}

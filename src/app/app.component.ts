import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { ClienteService } from './services/cliente.service';
import { ToastService } from './services/toast.service';
import * as moment from 'moment';
import { ConnectivityProvider } from './providers/connectivity.provider';

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
  conStatus: boolean = true;
  cont = 0;

  constructor(private location: Location, private cs: ClienteService, private toastr: ToastService,
    private net: ConnectivityProvider) {}

  ngOnInit() {
    if(this.location.path() == "" || this.location.path() == "/login")
      this.ruta = false;
    else{
      this.verificarTimepoAcceso();
      this.cs.setCliente(JSON.parse(sessionStorage.getItem('cliente') || '{}'))
    }
    this.toastr.toastr(" ", " ", 3000);
    this.getConexionStatus();
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

  getConexionStatus(){
    this.net.getStatus().subscribe(status => {
      if(status){
        this.conStatus = status.connected;
      }
      if(this.cont != 0)
        this.toastConexion()
      
      this.cont++
    })
  }

  toastConexion(){
    if(this.conStatus){
      this.toastr.toastr("Se ha recuperado la conexión a internet.", "secondary", 3000)
    }
    else
      this.toastr.toastr("Se ha perdido la conexión a internet.", "danger", 3000)
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = "/login";
  }
}

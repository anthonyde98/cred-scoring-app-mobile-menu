import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ClienteService } from './services/cliente.service';

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
    { title: 'Próximo crédito', url: 'siguiente-credito', icon: 'play-forward' }
  ];

  constructor(private location: Location, private cs: ClienteService,) {}

  ngOnInit() {
    if(this.location.path() == "" || this.location.path() == "/login")
      this.ruta = false;
    else{
      this.cs.setCliente(JSON.parse(sessionStorage.getItem('cliente') || '{}'))
    }
  }

  cerrarSesion(){
    sessionStorage.clear();
    location.href = "/login";
  }
}

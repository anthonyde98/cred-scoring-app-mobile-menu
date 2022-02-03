import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-siguiente-credito',
  templateUrl: './siguiente-credito.page.html',
  styleUrls: ['./siguiente-credito.page.scss'],
})
export class SiguienteCreditoPage implements OnInit {
  nextCredit: any;
  servicios: any;
  constructor(private clienteService: ClienteService) { }

  ngOnInit(){
    this.getNextCredit();
  }

  getNextCredit(){
    this.nextCredit = this.clienteService.getClienteNextCredit();
    this.setDatos();
  }

  setDatos(){
    const servicios = () => {
      const opciones = [
        {
          valor: "Casa",
          value: "home"
        },
        {
          valor: "Carro",
          value: "car-sport"
        },
        {
          valor: "Ajuar",
          value: "bed"
        },
        {
          valor: "Viajes",
          value: "boat"
        }
      ];
      let servicios: any[] = [];

      if(this.nextCredit >= 1500000){
        for(let i=0; i < 4; i++){
          servicios.push(opciones[i]);
        }
      }
      else if(this.nextCredit < 1500000 && this.nextCredit >= 300000){
        for(let i=1; i < 4; i++){
          servicios.push(opciones[i]);
        }
      }
      else if(this.nextCredit < 300000 && this.nextCredit >= 50000){
        for(let i=3; i < 4; i++){
          servicios.push(opciones[i]);
        }
      }

      return servicios;
    }

    this.servicios = servicios();
  }
}

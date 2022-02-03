import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-puntaje',
  templateUrl: './puntaje.page.html',
  styleUrls: ['./puntaje.page.scss'],
})
export class PuntajePage implements OnInit {
  cliente: string = "";
  score: any;
  color: any;
  historial: boolean = false;
  tiempo: string = "";

  constructor(private clienteService: ClienteService) {}

  ngOnInit(){                      
    this.getScore();   
  }

  getScore(){
    this.cliente = this.clienteService.getClientePerfil().FirstName || "";
    this.score = this.clienteService.getClienteScore();
    this.setDatos();   
  }

  setDatos(){
    this.color = {
      colorProbabilidadImpago: "",
      colorScore: "",
    }

    if(this.score['unPaymentProbability'] <= 0.33)
      this.color.colorProbabilidadImpago = 'green';
    else if(this.score['unPaymentProbability'] <= 0.66 && this.score['unPaymentProbability'] >= 0.33)
      this.color.colorProbabilidadImpago = 'orange';
    else
      this.color.colorProbabilidadImpago = 'red';

    if(this.score['creditScore'] >= 667)
      this.color.colorScore = 'green';
    else if(this.score['creditScore'] <= 666 && this.score['creditScore'] >= 333)
      this.color.colorScore = 'orange';
    else
      this.color.colorScore = 'red';
    
    let fecha1 = moment(this.score.dateCreated);
    let fecha2 = moment(new Date());
    const tiempo = () => {
      let dato: string;
      if(fecha2.diff(fecha1, 'years') > 0){
        dato = fecha2.diff(fecha1, 'years') == 1 ? fecha2.diff(fecha1, 'years') + " año" :
        fecha2.diff(fecha1, 'years') + " años";
      }
      else if(fecha2.diff(fecha1, 'months') > 0){
        dato = fecha2.diff(fecha1, 'months') == 1 ? fecha2.diff(fecha1, 'months') + " mes" : 
        fecha2.diff(fecha1, 'months') + " meses";
      }
      else if(fecha2.diff(fecha1, 'weeks') > 0){
        dato = fecha2.diff(fecha1, 'weeks') == 1 ? fecha2.diff(fecha1, 'weeks') + " semana" :
        fecha2.diff(fecha1, 'weeks') + " semanas";
      }
      else{
        dato = fecha2.diff(fecha1, 'days') == 1 ? fecha2.diff(fecha1, 'days') + " dia" :
        fecha2.diff(fecha1, 'days') + " días";
      }

      return dato;
    }
    this.tiempo = tiempo();
    
    let pagosBuenos = this.clienteService.getClienteCurrentCredit().payments?.goodPayments || 0;
    let pagosMalos = this.clienteService.getClienteCurrentCredit().payments?.badPayments || 0;
    this.historial =  (pagosMalos + pagosBuenos ) > 0 ? true : false;
  }
}

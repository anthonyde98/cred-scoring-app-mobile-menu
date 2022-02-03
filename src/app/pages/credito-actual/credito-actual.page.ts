import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-credito-actual',
  templateUrl: './credito-actual.page.html',
  styleUrls: ['./credito-actual.page.scss'],
})
export class CreditoActualPage implements OnInit {
  currentCredit: any;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getCurrentCredit();
  }

  getCurrentCredit(){
    this.currentCredit = this.clienteService.getClienteCurrentCredit();
  }
}

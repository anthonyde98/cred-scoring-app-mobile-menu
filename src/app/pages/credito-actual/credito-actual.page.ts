import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-credito-actual',
  templateUrl: './credito-actual.page.html',
  styleUrls: ['./credito-actual.page.scss'],
})
export class CreditoActualPage implements OnInit {
  currentCredit: any;
  scroll: boolean = false;

  @ViewChild(IonContent) content: IonContent;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.getCurrentCredit();
  }

  getCurrentCredit(){
    this.currentCredit = this.clienteService.getClienteCurrentCredit();
  }

  setScroll(event){
    if(event.detail.scrollTop > 0)  
      this.scroll = true;
    else
      this.scroll = false;
  }
}

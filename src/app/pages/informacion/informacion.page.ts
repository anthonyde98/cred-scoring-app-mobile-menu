import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import * as moment from 'moment';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {
  clienteInfo: any;
  clienteFormat: any;
  edad!: string;
  scroll: boolean = false;

  @ViewChild(IonContent) content: IonContent;
  
  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.getPerfil();
  }

  getPerfil(){
    this.clienteInfo = this.clienteService.getClientePerfil();
    this.setDatos();
  }

  setDatos(){
    const estado = () => {
      if(this.clienteInfo.Status == "Enabled")
        return "Activo";
      else if(this.clienteInfo.Status == "Deleted")
        return "Eliminado";
      else if(this.clienteInfo.Status == "Disabled")
        return "Deshabilitado";
      else
        return "En evaluación";
    }
    const sexo = () => {
      if(this.clienteInfo.Gender == "F")
        return "Mujer";
      else if(this.clienteInfo.Gender == "M")
        return "Hombre";
      else
        return "Otro";
    }
    const estadoCivil = () => {
      let letra = this.clienteInfo.Gender == "F" ? "a" : "o";
      if(this.clienteInfo.MaritalStatus == "Single")
        return "Solter" + letra;
      else if(this.clienteInfo.MaritalStatus == "Married")
        return "Casad" + letra;
      else if(this.clienteInfo.MaritalStatus == "Widowed")
        return "Viud" + letra;
      else if(this.clienteInfo.MaritalStatus == "Partner")
        return "Unión libre";
      else if(this.clienteInfo.MaritalStatus == "Divorced")
        return "Divorciad" + letra;
      else
        return "Otro";
    }
    const nombreCompleto = () => {
      let nombre = this.clienteService.detalle.profile.FirstName + " ";
      let segundoNombre = this.clienteService.detalle.profile.MiddleName == null ?  null 
      : this.clienteService.detalle.profile.MiddleName + " ";
      let apellidos = this.clienteService.detalle.profile.LastName;
    
      return nombre + segundoNombre + apellidos;
    }
    this.clienteFormat = {
      estado: estado(),
      sexo: sexo(),
      estadoCivil: estadoCivil(),
      tipo: this.clienteInfo.LegalEntityType == "Person" ? "Personal" : "De negocios",
      nombre: nombreCompleto()
    }

    let fecha1 = moment(this.clienteInfo.DateOfBirth);
    let fecha2 = moment(new Date());

    this.edad = fecha2.diff(fecha1, 'years').toString();
  }

  setScroll(event){
    if(event.detail.scrollTop > 0)  
      this.scroll = true;
    else
      this.scroll = false;
  }
}

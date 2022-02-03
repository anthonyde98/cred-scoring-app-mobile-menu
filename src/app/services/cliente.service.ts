import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  acceso = new EventEmitter<boolean>();
  detalle: any;

  hostUrl = environment.hostUrl;
  clienteLoginUrl = "/cliente_login";
  detalleClienteUrl = "/detalle_cliente";

  constructor(private http: HttpClient, private toast: ToastService) { }

  getExisteCliente(usuario: any): Observable<any>{
    return this.http.post(this.hostUrl + this.clienteLoginUrl, usuario, {observe: 'response'})
  }

  async setAccess(acceso: any){

    await this.http.post(this.hostUrl + this.detalleClienteUrl, acceso, {observe: 'response'}).subscribe(data => {
      if(data.status === 200){
        this.detalle = data.body;
        sessionStorage.setItem('cliente', JSON.stringify(this.detalle));
        this.acceso.emit(true);
      } 
    }, error => {
      if(error.status === 404){

        this.toast.toastr("No se encontró este cliente.", "danger", 3000);
      }
      else if(error.status === 401){
        this.toast.toastr(
          "Esta cuenta acaba de ser iniciada con otro dispositivo.<br/><br/>Vuelva a iniciar sesión para poder tener acceso.",
          "danger", 3000)
      }
      else if(error.status === 500){
        this.toast.toastr(
          "Hubo un error en el servidor principal.<br/><br/>Vuelva a intentar más tarde.",
          "danger", 3000
        )
      }
      else{
        this.toast.toastr(
          "Hubo un error desconocido.<br/><br/>Vuelva a intentar más tarde.",
          "danger", 3000
        )
      } 
    
      this.acceso.emit(false);
    })
  }

  setCliente(cliente: any){
    this.detalle = cliente;
  }

  getClientePerfil(): any{
    return this.detalle.profile;
  }

  getClienteScore(): any{
    return this.detalle.scoring;
  }

  getClienteCurrentCredit(): any{
    return this.detalle.creditInProgress;
  }

  getClienteNextCredit(): any{
    return this.detalle.nextCredit;
  }
}


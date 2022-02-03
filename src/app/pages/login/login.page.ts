import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarioForm!: FormGroup;
  spinner = false;
  constructor(private fb: FormBuilder, private toast: ToastService, private clienteService: ClienteService) {
    this.cargarForm();
  }

  ngOnInit() {
  }

  async buscarExisteUsuario(){
    this.spinner = true;

    if(this.usuarioForm.invalid){
      this.toast.toastr("Debe de llenar correctamente todos los campos.", "warning", 3000);
      this.spinner = false;
      return;
    }

    const usuario: any = {
      username: this.usuarioForm.get('user')?.value,
      password: this.usuarioForm.get('pass')?.value
    };

    await this.clienteService.getExisteCliente(usuario).subscribe(data => {

      if(data.status == 200){
        sessionStorage.setItem('usuario', this.usuarioForm.get('user')?.value);
        sessionStorage.setItem('auth_token', data.body.auth_token)
        sessionStorage.setItem('access_token', data.body.access_token)
        sessionStorage.setItem('fechaLogin', new Date().toString())
        sessionStorage.setItem('clienteCodigo', data.body.codigoCliente)

        const acceso: any = {
          profileId: data.body.codigoCliente,
          auth_token: data.body.auth_token,
          access_token: data.body.access_token
        };

        this.clienteService.setAccess(acceso);
        this.clienteService.acceso.subscribe(data => {
          if(data){
            location.href = "informacion";    
          }
          else{
            this.spinner = false;
            sessionStorage.clear(); 
          }
        })
      }                  
    }, error => {
      if(error.status = 404){
        this.toast.toastr("No se encontró este usuario.", "danger", 3000);
      }
      else
        this.toast.toastr("Hubo un error al intentar completar esta solicitud.", "danger", 3000);

      this.spinner = false;      
    });
  }
  

  estiloInput(inputName: string): string{
    let resp = "";

    if(this.usuarioForm.get(inputName)?.invalid && this.usuarioForm.get(inputName)?.touched)
      resp ="red";
    else if(this.usuarioForm.get(inputName)?.valid && this.usuarioForm.get(inputName)?.touched) 
      resp = "green";
    else
      resp = "rgb(231, 53, 157)";
    
    return resp;
  }

  cargarForm(){
    this.usuarioForm = this.fb.group({
      user: ["", [Validators.required, Validators.minLength(5)]],
      pass: ["", [Validators.required, Validators.minLength(5)]]
    })  
  }
}

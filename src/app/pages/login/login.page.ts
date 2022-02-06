import { Component, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectivityProvider } from 'src/app/providers/connectivity.provider';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastService } from 'src/app/services/toast.service';
import { Storage } from '@capacitor/storage';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarioForm!: FormGroup;
  spinner = false;
  conStatus: boolean = true;
  credentialsOK: boolean;

  constructor(private fb: FormBuilder, private toast: ToastService, private clienteService: ClienteService,
    private net: ConnectivityProvider, private faio: FingerprintAIO, private renderer: Renderer2) {
    this.cargarForm();
  }

  ngOnInit() {
    this.getConexionStatus();
    this.credentialsCheck();
    this.fixedKeyboardBug();
    this.setInputsColor()
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

    await this.obtenerAcceso(usuario);
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

  getConexionStatus(){
    this.net.getStatus().subscribe(status => {
      if(status){
        this.conStatus = status.connected;
      }
    })
  }

  async credentialsCheck(){
    const { value } = await Storage.get({ key: 'credentials' });
    const credentials = JSON.parse(value || "0");

    if(credentials != "0"){
      this.credentialsOK = true;
    }
    else{
      this.credentialsOK = false;
    }
  }

  async fingerPrintAuth() {

    this.faio.isAvailable().then((result: any) => {

      this.faio.show({
        cancelButtonTitle: 'Cancelar',
        description: "Use su huella digital para acceder.",
        disableBackup: false,
        title: 'Acceso biometrico',
        fallbackButtonTitle: 'Usar backup'
      })
      .then( async (result: any) => {
        this.spinner = true;
        const { value } = await Storage.get({ key: 'credentials' });
        const credentials = JSON.parse(value || "0");
        if(credentials != "0"){
          if(this.conStatus == true)
            this.obtenerAcceso(credentials);
          else{
            this.spinner = false;
            this.toast.toastr("El dispositivo no esta conectado a internet.", "danger", 5000);
            return;
          }
        }
        else{
          this.toast.toastr("Hubo un error verificando las credenciales", "danger", 5000)
          this.spinner = false;
          return;
        }
      })
      .catch((error: any) => {
        if(error.code == -111)
          alert("Se realizó demasiados intentos fallidos. Intente de nuevo unos minutos despues. Si el sensor no esta funcionando, entre mediante otro metodo y desactive la opción de acceso biometrico.");
      });
    })
    .catch((error: any) => {
      console.log(error);
    });
  }

  async obtenerAcceso(usuario){
    if(this.conStatus == true)
      await this.clienteService.getExisteCliente(usuario).subscribe(data => {

        if(data.status == 200){
          sessionStorage.setItem('usuario', usuario.username);
          sessionStorage.setItem('contrasena', usuario.password);
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
    else{
      this.spinner = false;
      this.toast.toastr("El dispositivo no esta conectado a internet.", "danger", 5000);
      return;
    }
  }

  fixedKeyboardBug(){
    
    Keyboard.addListener('keyboardWillShow', (info: any) => {
      document.getElementById("container").style.top = "55%";
    });
    
    Keyboard.addListener('keyboardWillHide', () => {
      document.getElementById("container").style.top = "45%";
    });
  }

  async setInputsColor(){
    const { value } = await Storage.get({ key: 'color-theme' });

    if(value == "light"){
      this.renderer.setAttribute(document.getElementById("name"), 'style', 
      'background: #f8f8f8; color: rgb(0, 0, 0); box-shadow: 0 2px 5px 0 rgb(146, 146, 146);');
      this.renderer.setAttribute(document.getElementById("pass"), 'style', 
      'background: #f8f8f8; color: rgb(0, 0, 0); box-shadow: 0 2px 5px 0 rgb(146, 146, 146);');
    }
    else{
      this.renderer.setAttribute(document.getElementById("name"), 'style', 
      'background: #363636; color: #fff; box-shadow: 0 2px 5px 0 rgb(71, 71, 71);');
      this.renderer.setAttribute(document.getElementById("pass"), 'style', 
      'background: #363636; color: #fff; box-shadow: 0 2px 5px 0 rgb(71, 71, 71);');
    }
  }
}

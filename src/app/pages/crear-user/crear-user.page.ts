import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IUsuario } from 'src/Interfaces/usuarios';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.page.html',
  styleUrls: ['./crear-user.page.scss'],
})
export class CrearUserPage implements OnInit {

  usuario: IUsuario = {
    usuario: "",
    email: "",    
    cel: "",      
    password: "",
    rut: ""       // Se agrega el campo RUT
  };

  repeatPassword: string = ""; // Campo para repetir el password

  constructor(
    private router: Router, 
    private usuariosservice: UsuariosService, 
    private alertcontroller: AlertController
  ) { }

  ngOnInit() { }

  // Función para validar el RUT con dígito verificador (módulo 11)
  validarRut(rut: string): boolean {
    if (!rut || rut.length < 9) return false;
    const rutClean = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rutClean.slice(0, -1);
    const dv = rutClean.slice(-1).toUpperCase();
    
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvFinal;
  }

  async crearUser() {
    // Validar que todos los campos estén rellenos
    if (!this.usuario.usuario || !this.usuario.password || !this.usuario.email || !this.usuario.cel || !this.usuario.rut || !this.repeatPassword) {
      const alert = await this.alertcontroller.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la ejecución si hay campos vacíos
    }
  
    // Validar que el password y la repetición sean iguales
    if (this.usuario.password !== this.repeatPassword) {
      const alert = await this.alertcontroller.create({
        header: 'Error',
        message: 'Los passwords no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la ejecución si los passwords no coinciden
    }
  
    // Validar que el teléfono solo contenga 9 dígitos numéricos
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(this.usuario.cel)) {
      const alert = await this.alertcontroller.create({
        header: 'Error',
        message: 'El teléfono debe contener solo 9 números y sin espacios ejemplo: "976748601"',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la ejecución si el teléfono no es válido
    }
  
    // Validar RUT con módulo 11
    if (!this.validarRut(this.usuario.rut)) {
      const alert = await this.alertcontroller.create({
        header: 'Error',
        message: 'El RUT ingresado no es válido.',
        buttons: ['OK']
      });
      await alert.present();
      return; // Detener la ejecución si el RUT no es válido
    }
  
    // Verificar si el correo ya está registrado
    this.usuariosservice.checkEmailExists(this.usuario.email).subscribe(async (usuarios) => {
      if (usuarios.length > 0) {
        const alert = await this.alertcontroller.create({
          header: 'Error',
          message: 'El correo ya está registrado.',
          buttons: ['OK']
        });
        await alert.present();
        return; // Detener la ejecución si el correo ya existe
      }
  
      // Agregar el usuario mediante el servicio
      this.usuariosservice.postUsuarios(this.usuario).subscribe(() => {
        this.mensaje();
      });
    });
  }
  

  async mensaje() {
    const alert = await this.alertcontroller.create({
      header: 'Crear Usuario',
      mode: 'ios',
      message: 'Su usuario ha sido creado!',
      buttons: [
        {
          text: 'Ingresar',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  regresar() {
    this.router.navigate(['/login'])
  }
}

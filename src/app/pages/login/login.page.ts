import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { IUsuarios } from 'src/Interfaces/usuarios';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuarios: IUsuarios[] = [];
  loginForm: FormGroup;

  constructor(
    private navController: NavController,
    private usuariosService: UsuariosService,
    private builder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    // Inicializamos el formulario reactivo con el campo email
    this.loginForm = this.builder.group({
      'email': new FormControl("", [Validators.required, Validators.email]), // Solo correo electrónico
      'password': new FormControl("", [Validators.required, Validators.minLength(8)]),
    });
  }

  ngOnInit() {
    // Obtenemos la lista de usuarios
    this.usuariosService.getUsuarios().subscribe((data: IUsuarios[]) => {
      this.usuarios = data;
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return; // Si el formulario no es válido, no hacemos nada
    }

    const email = this.loginForm.value.email; // Obtenemos el correo
    const password = this.loginForm.value.password;

    // Verificamos si las credenciales coinciden con un usuario
    const usuarioValido = this.usuarios.find(usuario => 
      usuario.email === email && usuario.password === password
    );

    if (usuarioValido) {
      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(usuarioValido));
      this.showToast(`Bienvenido, ${email}`);
      this.navController.navigateRoot('/inicio');
    } else {
      this.showErrorAlert();
      this.loginForm.reset();
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Credenciales incorrectas',
      buttons: ['OK']
    });
    await alert.present();
  }

  registrarse() {
    this.navController.navigateRoot('/crear-user');
  }

  async recuperar() {
    console.log('Click en recuperar contraseña');
  }
}

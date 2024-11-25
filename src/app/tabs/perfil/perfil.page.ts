import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IUsuario } from 'src/Interfaces/usuarios'; 
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre: string = '';        
  correo: string = '';        
  telefono: string = ''; 
  rut: string = '';     
  usuario: IUsuario | null = null;
  avatar: string = 'assets/fotos/avatar.jpg'; // Imagen por defecto

  constructor(
    private router: Router,
    private alertcontroller: AlertController,
    private usuarioservice: UsuariosService 
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarAvatar(); // Carga la imagen del avatar guardada (si existe)
  }

  ionViewWillEnter(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.usuario = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.usuario || !this.usuario.usuario) {
      this.router.navigate(['/login']);
    } else {
      this.nombre = this.usuario.usuario;
      this.correo = this.usuario.email;
      this.telefono = this.usuario.cel;
      this.rut = this.usuario.rut;
    }
  }

  cargarAvatar(): void {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      this.avatar = savedAvatar; // Actualiza el avatar si ya hay uno guardado
    }
  }

  selectImage(fileInput: HTMLInputElement): void {
    fileInput.click(); // Dispara el clic en el input de archivo
  }
  

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatar = reader.result as string; // Actualiza la imagen del avatar
        localStorage.setItem('userAvatar', this.avatar); // Guarda el avatar en localStorage
      };
      reader.readAsDataURL(file);
    }
  }

  editar(): void {
    this.router.navigate(['/detalle-perfil'], {
      queryParams: { 
        usuario: JSON.stringify(this.usuario)
      }
    });
  }

  async cerrar(): Promise<void> {
    const alert = await this.alertcontroller.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  CargarApi(): void {
    this.usuarioservice.getUsuarios().subscribe(resp => {
      console.log(resp);
    });
  }
}

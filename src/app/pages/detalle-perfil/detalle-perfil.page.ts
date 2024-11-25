import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IUsuarios } from 'src/Interfaces/usuarios'; // Cambia esto
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.page.html',
  styleUrls: ['./detalle-perfil.page.scss'],
})
export class DetallePerfilPage implements OnInit {
  usuario: IUsuarios | null = null; // Cambia el tipo aquí

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private usuarioservice: UsuariosService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['usuario']) {
        this.usuario = JSON.parse(params['usuario']);
      }
    });
  }

  async guardarCambios() {
    if (this.usuario) {
      const alert = await this.alertController.create({
        header: 'Confirmar',
        message: '¿Está seguro de que desea guardar los cambios?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          },
          {
            text: 'Aceptar',
            handler: () => this.actualizaUsuario(),
          },
        ],
      });
      await alert.present();
    }
  }

  async actualizaUsuario() {
    if (this.usuario) {
      this.usuarioservice.putUsuarios(this.usuario).subscribe(
        async response => {
          console.log('Cambios guardados:', response);
          // Mostrar alerta de confirmación
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Cambios guardados correctamente. ESTOS SE VERAN REFLEJADOS AL VOLVER A INICIAR LA SESION.',
            buttons: ['Aceptar'],
          });
          await alert.present();
          this.router.navigate(['/inicio/perfil']); // Redirigir después de guardar
        },
        error => {
          console.error('Error al guardar los cambios', error);
          this.mostrarError('No se pudieron guardar los cambios. Intente nuevamente.');
        }
      );
    }
  }

  private async mostrarError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  regresar(){
    this.router.navigate(['/inicio/perfil'])
  }
}

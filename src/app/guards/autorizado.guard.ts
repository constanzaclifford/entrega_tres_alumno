import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard  {


  constructor(private usuarioservice: UsuariosService, 
              private toast: ToastController,
              private router: Router){
  }

  canActivate():
    
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.usuarioservice.isLoggedIn()){
        this.showToast('Debe iniciar sesión..');
        this.router.navigateByUrl('/inicio');
        return false;
      }
      else{
        this.usuarioservice.isLoggedIn();
        return true;    
      }
      
    }

    async showToast(msg: any){
      const toast = await this.toast.create({
        message:msg,
        duration: 3000
      });
      toast.present();
    }

}

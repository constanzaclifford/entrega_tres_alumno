import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

interface Opciones{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menucontroller:MenuController) {}

  opciones: Opciones[] =[

    {
      icon:'body-outline',
      name: 'Perfil',
      redirecTo:'/inicio/perfil'
    },
    {
      icon:'exit-outline',
      name: 'Exit',
      redirecTo:'/login'
    },

  ]
}

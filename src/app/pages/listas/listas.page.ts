import { Component, OnInit } from '@angular/core';
import { ListaService } from 'src/app/services/lista.service';
import { Lista } from 'src/Interfaces/lista'; // Asegúrate de que la interfaz esté bien definida

@Component({
  selector: 'app-lista',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListaPage implements OnInit {
  listas: Lista[] = []; // Array vacío de tipo Lista

  constructor(private listaService: ListaService) {}

  ngOnInit() {
    this.listaService.getListas().subscribe((data: Lista[]) => {
      console.log(data);  // Esto debería mostrar los datos de la API en la consola
      this.listas = data;
    });
  }
  
}

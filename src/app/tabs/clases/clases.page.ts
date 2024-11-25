import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  agendaClases = [
    { fecha: '2024-09-10', nombre: 'Matemáticas', hora: '09:00 - 10:00', ubicacion: 'Aula 101' },
    { fecha: '2024-09-11', nombre: 'Física', hora: '10:00 - 11:00', ubicacion: 'Aula 102' },
    { fecha: '2024-09-12', nombre: 'Química', hora: '11:00 - 12:00', ubicacion: 'Aula 103' }
    // Agrega más clases según sea necesario
  ];

  constructor() { }

  ngOnInit() {
    // Aquí puedes inicializar datos si es necesario
  }
}

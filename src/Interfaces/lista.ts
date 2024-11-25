export interface Listas {
    lista: Lista[]; // Array de objetos 'Lista'
  }
  
  export interface Lista {
    nombre: string; // Nombre del usuario
    asistencia: boolean; // Estado de asistencia (true o false)
    fecha: string; // Fecha del registro (en formato YYYY-MM-DD)
  }
  

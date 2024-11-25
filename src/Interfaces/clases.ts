// Petición GET, PUT, DELETE
export interface IClases {
    id: number;                       // Identificador único de la clase
    imagen: string;                   // URL de la imagen de la clase
    nombre: string;                   // Nombre de la clase
    descripcion: string;              // Descripción de la clase
    asignatura: string;               // Nombre de la asignatura
    horario: {                        // Horario de la clase
        dia: string;                  // Día de la semana (ej: "jueves")
        horaInicio: string;           // Hora de inicio en formato 24 horas (ej: "19:00")
    };
    profesor: string;                 // Nombre del profesor
}

// Petición POST
export interface IClase {
    imagen: string;                   // URL de la imagen de la clase
    nombre: string;                   // Nombre de la clase
    descripcion: string;              // Descripción de la clase
    asignatura: string;               // Nombre de la asignatura
    horario: {                        // Horario de la clase
        dia: string;                  // Día de la semana (ej: "jueves")
        horaInicio: string;           // Hora de inicio en formato 24 horas (ej: "19:00")
    };
    profesor: string;                 // Nombre del profesor
}

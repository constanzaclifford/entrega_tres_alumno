// Petición GET, PUT, DELETE para usuarios
export interface IUsuarios {
    id: number;                      // Identificador único del usuario
    usuario: string;                 // Nombre de usuario
    password: string;                // Contraseña del usuario
    email: string;                   // Correo electrónico del usuario
    cel: string;                     // Teléfono/celular del usuario
    rut: string; 
}

// Petición POST para crear un usuario
export interface IUsuario {
    usuario: string;                 // Nombre de usuario
    password: string;                // Contraseña del usuario
    email: string;                   // Correo electrónico del usuario
    cel: string;                     // Teléfono/celular del usuario
    rut: string; 
}

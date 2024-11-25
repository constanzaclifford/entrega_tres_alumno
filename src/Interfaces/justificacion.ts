export interface IJustificacion {
  id: number;
  motivo: string;
  descripcion: string;
  fecha?: string;
  archivo?: string;
  usuarioId: number;
  comentario?: string; // Campo agregado
}

export interface IJustificacionPost {
  motivo: string;
  descripcion: string;
  fecha?: string;
  archivo?: string;
  usuarioId: number;
  comentario?: string; // Campo agregado
}

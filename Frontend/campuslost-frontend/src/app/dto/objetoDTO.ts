export interface ObjetoDto {
  idObjeto?: number;
  titulo?: string;
  descripcion?: string;
  lugar?: string;
  fecha?: string;
  fechaEvento?: string;

  // Usuario (quién registró / responsable)
  idUsuario?: number;
  usuario?: {
    idUsuario?: number;
    id_usuario?: number;
    nombre?: string;
    correo?: string;
  };

  // Categoría
  idCategoria?: number;
  categoria?: {
    idCategoria?: number;
    id_categoria?: number;
    nombre?: string;
  };
  categoriaNombre?: string;

  // Estado (puede venir como relación o como texto)
  idEstado?: number;
  estado?: {
    idEstado?: number;
    id_estado?: number;
    nombre?: string;
  };
  estadoNombre?: string;

  // Backends a veces envían snake_case
  id_objeto?: number;
  id_estado?: number;
  id_categoria?: number;
  id_usuario?: number;
  fecha_evento?: string;
}

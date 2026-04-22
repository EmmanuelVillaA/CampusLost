export interface EstadoDto {
  idEstado?: number;
  nombre: string;

  // Backends a veces envían snake_case
  id_estado?: number;
}

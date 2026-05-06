package com.campuslost.backend.service;

import com.campuslost.backend.entity.respuestaReclamacion;
import java.util.List;

public interface respuestaReclamacionService {
    respuestaReclamacion guardar(respuestaReclamacion respuesta);
    List<respuestaReclamacion> listarPorIntento(Integer idIntento);
}
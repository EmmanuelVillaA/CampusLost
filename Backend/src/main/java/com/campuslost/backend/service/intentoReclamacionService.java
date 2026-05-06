package com.campuslost.backend.service;

import com.campuslost.backend.entity.intentoReclamacion;
import java.util.List;

public interface intentoReclamacionService {
    intentoReclamacion crear(intentoReclamacion intento);
    List<intentoReclamacion> listarPorObjeto(Integer idObjeto);
    List<intentoReclamacion> listarPorUsuario(Integer idUsuario);
    intentoReclamacion cambiarEstado(Integer id, intentoReclamacion.EstadoIntento estado);
}
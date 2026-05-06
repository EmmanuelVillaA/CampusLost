package com.campuslost.backend.service;

import com.campuslost.backend.entity.preguntaVerificacion;
import java.util.List;

public interface preguntaVerificacionService {
    preguntaVerificacion guardar(preguntaVerificacion pregunta);
    List<preguntaVerificacion> listarPorObjeto(Integer idObjeto);
    preguntaVerificacion actualizar(Integer id, preguntaVerificacion datos);
    void eliminar(Integer id);
}
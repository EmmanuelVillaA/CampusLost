package com.campuslost.backend.service;

import com.campuslost.backend.entity.estado;
import java.util.List;

public interface estadoService {

    estado guardar(estado estado);

    List<estado> listar();

    estado obtenerPorId(Integer id);

    void eliminar(Integer id);
}

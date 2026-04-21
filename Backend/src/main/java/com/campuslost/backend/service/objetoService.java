package com.campuslost.backend.service;

import com.campuslost.backend.entity.objeto;
import java.util.List;

public interface objetoService {

    objeto guardar(objeto objeto);

    List<objeto> listar();

    objeto obtenerPorId(Integer id);

    objeto actualizar(Integer id, objeto objeto);

    void eliminar(Integer id);
}
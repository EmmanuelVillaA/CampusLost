package com.campuslost.backend.service;

import com.campuslost.backend.entity.rol;
import java.util.List;

public interface rolService {

    rol guardar(rol rol);

    List<rol> listar();

    rol obtenerPorId(Integer id);

    void eliminar(Integer id);
}
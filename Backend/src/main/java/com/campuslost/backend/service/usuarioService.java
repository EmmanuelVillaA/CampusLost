package com.campuslost.backend.service;

import com.campuslost.backend.entity.usuario;
import java.util.List;

public interface usuarioService {

    usuario guardar(usuario usuario);

    List<usuario> listar();

    usuario obtenerPorId(Integer id);
    
    usuario actualizar(Integer id, usuario usuario, Integer idUsuarioEditor);

    void eliminar(Integer id);
}
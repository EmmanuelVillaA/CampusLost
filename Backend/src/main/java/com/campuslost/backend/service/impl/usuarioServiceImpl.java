package com.campuslost.backend.service.impl;

import com.campuslost.backend.entity.usuario;
import com.campuslost.backend.repository.usuarioRepository;
import com.campuslost.backend.service.usuarioService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class usuarioServiceImpl implements usuarioService {

    private final usuarioRepository usuarioRepository;

    public usuarioServiceImpl(usuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public usuario guardar(usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<usuario> listar() {
        return usuarioRepository.findAll();
    }

    @Override
    public usuario obtenerPorId(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }
    
    @Override
    public usuario actualizar(Integer id, usuario usuario, Integer idUsuarioEditor) {

        usuario editor = usuarioRepository.findById(idUsuarioEditor).orElse(null);

        if (editor == null || editor.getRol().getIdRol() != 1) {
            throw new RuntimeException("No tienes permisos para editar usuarios");
        }

        usuario existente = usuarioRepository.findById(id).orElse(null);

        if (existente == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        existente.setNombre(usuario.getNombre());
        existente.setCorreo(usuario.getCorreo());
        existente.setContrasena(usuario.getContrasena());
        existente.setRol(usuario.getRol());

        return usuarioRepository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        usuarioRepository.deleteById(id);
    }
}

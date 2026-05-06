package com.campuslost.backend.service.impl;

import com.campuslost.backend.entity.intentoReclamacion;
import com.campuslost.backend.repository.intentoReclamacionRepository;
import com.campuslost.backend.service.intentoReclamacionService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class intentoReclamacionServiceImpl implements intentoReclamacionService {

    private final intentoReclamacionRepository repository;

    public intentoReclamacionServiceImpl(intentoReclamacionRepository repository) {
        this.repository = repository;
    }

    @Override
    public intentoReclamacion crear(intentoReclamacion intento) {
        return repository.save(intento);
    }

    @Override
    public List<intentoReclamacion> listarPorObjeto(Integer idObjeto) {
        return repository.findByObjetoIdObjeto(idObjeto);
    }

    @Override
    public List<intentoReclamacion> listarPorUsuario(Integer idUsuario) {
        return repository.findByUsuarioIdUsuario(idUsuario);
    }

    @Override
    public intentoReclamacion cambiarEstado(Integer id, intentoReclamacion.EstadoIntento estado) {
        intentoReclamacion existente = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Intento no encontrado"));
        existente.setEstado(estado);
        return repository.save(existente);
    }
}
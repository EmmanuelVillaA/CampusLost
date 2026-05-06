package com.campuslost.backend.service.impl;

import com.campuslost.backend.entity.respuestaReclamacion;
import com.campuslost.backend.repository.respuestaReclamacionRepository;
import com.campuslost.backend.service.respuestaReclamacionService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class respuestaReclamacionServiceImpl implements respuestaReclamacionService {

    private final respuestaReclamacionRepository repository;

    public respuestaReclamacionServiceImpl(respuestaReclamacionRepository repository) {
        this.repository = repository;
    }

    @Override
    public respuestaReclamacion guardar(respuestaReclamacion respuesta) {
        return repository.save(respuesta);
    }

    @Override
    public List<respuestaReclamacion> listarPorIntento(Integer idIntento) {
        return repository.findByIntentoIdIntento(idIntento);
    }
}
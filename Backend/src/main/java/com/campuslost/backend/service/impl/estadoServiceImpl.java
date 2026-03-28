package com.campuslost.backend.service.impl;

import com.campuslost.backend.entity.estado;
import com.campuslost.backend.repository.estadoRepository;
import com.campuslost.backend.service.estadoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class estadoServiceImpl implements estadoService {

    private final estadoRepository estadoRepository;

    public estadoServiceImpl(estadoRepository estadoRepository) {
        this.estadoRepository = estadoRepository;
    }

    @Override
    public estado guardar(estado estado) {
        return estadoRepository.save(estado);
    }

    @Override
    public List<estado> listar() {
        return estadoRepository.findAll();
    }

    @Override
    public estado obtenerPorId(Integer id) {
        return estadoRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Integer id) {
        estadoRepository.deleteById(id);
    }
}

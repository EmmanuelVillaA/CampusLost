package com.campuslost.backend.service.impl;

import com.campuslost.backend.entity.rol;
import com.campuslost.backend.repository.rolRepository;
import com.campuslost.backend.service.rolService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class rolServiceImpl implements rolService {

    private final rolRepository rolRepository;

    public rolServiceImpl(rolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    @Override
    public rol guardar(rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public List<rol> listar() {
        return rolRepository.findAll();
    }

    @Override
    public rol obtenerPorId(Integer id) {
        return rolRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Integer id) {
        rolRepository.deleteById(id);
    }
}

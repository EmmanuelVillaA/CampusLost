package com.campuslost.backend.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;

import com.campuslost.backend.entity.categoria;
import com.campuslost.backend.repository.categoriaRepository;
import com.campuslost.backend.service.categoriaService;

@Service
public class categoriaServiceImpl implements categoriaService {

    private final categoriaRepository categoriaRepository;

    public categoriaServiceImpl(categoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public categoria guardar(categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public List<categoria> listar() {
        return categoriaRepository.findAll();
    }
    
    @Override
    public categoria obtenerPorId(Integer id) {
        return categoriaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Integer id) {
        categoriaRepository.deleteById(id);
    }
}
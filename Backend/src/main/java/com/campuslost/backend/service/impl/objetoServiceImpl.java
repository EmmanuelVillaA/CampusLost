package com.campuslost.backend.service.impl;

import com.campuslost.backend.entity.objeto;
import com.campuslost.backend.repository.objetoRepository;
import com.campuslost.backend.service.objetoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class objetoServiceImpl implements objetoService {

    private final objetoRepository objetoRepository;

    public objetoServiceImpl(objetoRepository objetoRepository) {
        this.objetoRepository = objetoRepository;
    }

    @Override
    public objeto guardar(objeto objeto) {
        return objetoRepository.save(objeto);
    }

    @Override
    public List<objeto> listar() {
        return objetoRepository.findAll();
    }

    @Override
    public objeto obtenerPorId(Integer id) {
        return objetoRepository.findById(id).orElse(null);
    }

    @Override
    public objeto actualizar(Integer id, objeto datos) {

        objeto existente = objetoRepository.findById(id).orElse(null);

        if (existente == null) {
            throw new RuntimeException("Objeto no encontrado");
        }

        existente.setTitulo(datos.getTitulo());
        existente.setDescripcion(datos.getDescripcion());
        existente.setLugar(datos.getLugar());
        existente.setFechaEvento(datos.getFechaEvento());
        existente.setImagenUrl(datos.getImagenUrl());
        existente.setCategoria(datos.getCategoria());
        existente.setEstado(datos.getEstado());

        return objetoRepository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        objetoRepository.deleteById(id);
    }
}
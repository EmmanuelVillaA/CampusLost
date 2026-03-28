package com.campuslost.backend.controller;


import com.campuslost.backend.entity.categoria;
import com.campuslost.backend.service.categoriaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class categoriaController {

    private final categoriaService categoriaService;

    public categoriaController(categoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // CREAR
    @PostMapping
    public categoria crear(@RequestBody categoria categoria) {
        return categoriaService.guardar(categoria);
    }

    // LISTAR
    @GetMapping
    public List<categoria> listar() {
        return categoriaService.listar();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public categoria obtener(@PathVariable Integer id) {
        return categoriaService.obtenerPorId(id);
    }

    // EDITAR
    @PutMapping("/{id}")
    public categoria actualizar(@PathVariable Integer id, @RequestBody categoria categoria) {
        categoria.setIdCategoria(id);
        return categoriaService.guardar(categoria);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        categoriaService.eliminar(id);
    }
}
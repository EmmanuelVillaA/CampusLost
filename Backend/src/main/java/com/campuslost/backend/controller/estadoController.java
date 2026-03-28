package com.campuslost.backend.controller;

import com.campuslost.backend.entity.estado;
import com.campuslost.backend.service.estadoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estados")
@CrossOrigin("*")
public class estadoController {

    private final estadoService estadoService;

    public estadoController(estadoService estadoService) {
        this.estadoService = estadoService;
    }

    @PostMapping
    public estado crear(@RequestBody estado estado) {
        return estadoService.guardar(estado);
    }

    @GetMapping
    public List<estado> listar() {
        return estadoService.listar();
    }

    @GetMapping("/{id}")
    public estado obtener(@PathVariable Integer id) {
        return estadoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public estado actualizar(@PathVariable Integer id, @RequestBody estado estado) {
        estado.setIdEstado(id);
        return estadoService.guardar(estado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        estadoService.eliminar(id);
    }
}

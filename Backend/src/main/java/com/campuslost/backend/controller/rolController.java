package com.campuslost.backend.controller;

import com.campuslost.backend.entity.rol;
import com.campuslost.backend.service.rolService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin("*")
public class rolController {

    private final rolService rolService;

    public rolController(rolService rolService) {
        this.rolService = rolService;
    }

    @PostMapping
    public rol crear(@RequestBody rol rol) {
        return rolService.guardar(rol);
    }

    @GetMapping
    public List<rol> listar() {
        return rolService.listar();
    }

    @GetMapping("/{id}")
    public rol obtener(@PathVariable Integer id) {
        return rolService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public rol actualizar(@PathVariable Integer id, @RequestBody rol rol) {
        rol.setIdRol(id);
        return rolService.guardar(rol);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        rolService.eliminar(id);
    }
}
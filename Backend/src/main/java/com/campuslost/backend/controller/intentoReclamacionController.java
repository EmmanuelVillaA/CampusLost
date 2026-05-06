package com.campuslost.backend.controller;

import com.campuslost.backend.entity.intentoReclamacion;
import com.campuslost.backend.service.intentoReclamacionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/intentos-reclamacion")
@CrossOrigin("*")
public class intentoReclamacionController {

    private final intentoReclamacionService service;

    public intentoReclamacionController(intentoReclamacionService service) {
        this.service = service;
    }

    @PostMapping
    public intentoReclamacion crear(@RequestBody intentoReclamacion intento) {
        return service.crear(intento);
    }

    @GetMapping("/objeto/{idObjeto}")
    public List<intentoReclamacion> listarPorObjeto(@PathVariable Integer idObjeto) {
        return service.listarPorObjeto(idObjeto);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<intentoReclamacion> listarPorUsuario(@PathVariable Integer idUsuario) {
        return service.listarPorUsuario(idUsuario);
    }

    @PatchMapping("/{id}/estado")
    public intentoReclamacion cambiarEstado(
            @PathVariable Integer id,
            @RequestParam intentoReclamacion.EstadoIntento estado) {
        return service.cambiarEstado(id, estado);
    }
}
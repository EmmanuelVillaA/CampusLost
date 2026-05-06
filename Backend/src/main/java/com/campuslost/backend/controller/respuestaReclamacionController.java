package com.campuslost.backend.controller;

import com.campuslost.backend.entity.respuestaReclamacion;
import com.campuslost.backend.service.respuestaReclamacionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/respuestas-reclamacion")
@CrossOrigin("*")
public class respuestaReclamacionController {

    private final respuestaReclamacionService service;

    public respuestaReclamacionController(respuestaReclamacionService service) {
        this.service = service;
    }

    @PostMapping
    public respuestaReclamacion guardar(@RequestBody respuestaReclamacion respuesta) {
        return service.guardar(respuesta);
    }

    @GetMapping("/intento/{idIntento}")
    public List<respuestaReclamacion> listarPorIntento(@PathVariable Integer idIntento) {
        return service.listarPorIntento(idIntento);
    }
}
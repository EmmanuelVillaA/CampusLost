package com.campuslost.backend.controller;

import com.campuslost.backend.entity.objeto;
import com.campuslost.backend.service.objetoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/objetos")
@CrossOrigin("*")
public class objetoController {

    private final objetoService objetoService;

    public objetoController(objetoService objetoService) {
        this.objetoService = objetoService;
    }

    @PostMapping
    public objeto guardar(@RequestBody objeto objeto) {
        return objetoService.guardar(objeto);
    }

    @GetMapping
    public List<objeto> listar() {
        return objetoService.listar();
    }

    @GetMapping("/{id}")
    public objeto obtener(@PathVariable Integer id) {
        return objetoService.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public objeto actualizar(@PathVariable Integer id,
                             @RequestBody objeto objeto) {
        return objetoService.actualizar(id, objeto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        objetoService.eliminar(id);
    }
}
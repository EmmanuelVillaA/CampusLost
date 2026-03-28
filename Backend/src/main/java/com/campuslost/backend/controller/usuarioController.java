package com.campuslost.backend.controller;

import com.campuslost.backend.entity.usuario;
import com.campuslost.backend.service.usuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")
public class usuarioController {

    private final usuarioService usuarioService;

    public usuarioController(usuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public usuario crear(@RequestBody usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    @GetMapping
    public List<usuario> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/{id}")
    public usuario obtener(@PathVariable Integer id) {
        return usuarioService.obtenerPorId(id);
    }
    
    @PutMapping("/{id}")
    public usuario actualizar(
            @PathVariable Integer id,
            @RequestBody usuario usuario,
            @RequestParam Integer editorId
    ) {
        return usuarioService.actualizar(id, usuario, editorId);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        usuarioService.eliminar(id);
    }
}
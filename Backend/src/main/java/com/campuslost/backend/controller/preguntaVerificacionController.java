package com.campuslost.backend.controller;

import com.campuslost.backend.entity.preguntaVerificacion;
import com.campuslost.backend.service.preguntaVerificacionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/preguntas-verificacion")
@CrossOrigin("*")
public class preguntaVerificacionController {

    private final preguntaVerificacionService service;

    public preguntaVerificacionController(preguntaVerificacionService service) {
        this.service = service;
    }

    @PostMapping
    public preguntaVerificacion guardar(@RequestBody preguntaVerificacion pregunta) {
        return service.guardar(pregunta);
    }

    @GetMapping("/objeto/{idObjeto}")
    public List<preguntaVerificacion> listarPorObjeto(@PathVariable Integer idObjeto) {
        return service.listarPorObjeto(idObjeto);
    }
    
    @PutMapping("/{id}")
    public preguntaVerificacion actualizar(@PathVariable Integer id,
                                            @RequestBody preguntaVerificacion pregunta) {
        return service.actualizar(id, pregunta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        service.eliminar(id);
    }
}
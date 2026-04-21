package com.campuslost.backend.controller;

import com.campuslost.backend.entity.usuario;
import com.campuslost.backend.repository.usuarioRepository;
import com.campuslost.backend.service.impl.loginRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final usuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(usuarioRepository usuarioRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public Object login(@RequestBody loginRequest request) {

        usuario user = usuarioRepository
                .findByCorreo(request.getCorreo())
                .orElse(null);

        if (user == null) {
            return "Correo no encontrado";
        }

        boolean ok = passwordEncoder.matches(
                request.getContrasena(),
                user.getContrasena()
        );

        if (!ok) {
            return "Contraseña incorrecta";
        }

        return user;
    }
}
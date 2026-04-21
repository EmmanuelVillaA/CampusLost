package com.campuslost.backend.repository;

import com.campuslost.backend.entity.usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface usuarioRepository extends JpaRepository<usuario, Integer> {
	Optional<usuario> findByCorreo(String correo);
}
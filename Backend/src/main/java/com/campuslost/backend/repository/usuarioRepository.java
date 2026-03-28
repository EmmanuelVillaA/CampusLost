package com.campuslost.backend.repository;

import com.campuslost.backend.entity.usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface usuarioRepository extends JpaRepository<usuario, Integer> {

}
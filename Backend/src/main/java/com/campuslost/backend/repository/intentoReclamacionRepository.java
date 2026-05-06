package com.campuslost.backend.repository;

import com.campuslost.backend.entity.intentoReclamacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface intentoReclamacionRepository 
    extends JpaRepository<intentoReclamacion, Integer> {

    List<intentoReclamacion> findByObjetoIdObjeto(Integer idObjeto);
    List<intentoReclamacion> findByUsuarioIdUsuario(Integer idUsuario);
}
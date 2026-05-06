package com.campuslost.backend.repository;

import com.campuslost.backend.entity.respuestaReclamacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface respuestaReclamacionRepository
    extends JpaRepository<respuestaReclamacion, Integer> {

    List<respuestaReclamacion> findByIntentoIdIntento(Integer idIntento);
}
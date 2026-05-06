package com.campuslost.backend.repository;

import com.campuslost.backend.entity.preguntaVerificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface preguntaVerificacionRepository 
    extends JpaRepository<preguntaVerificacion, Integer> {

    List<preguntaVerificacion> findByObjetoIdObjeto(Integer idObjeto);
}
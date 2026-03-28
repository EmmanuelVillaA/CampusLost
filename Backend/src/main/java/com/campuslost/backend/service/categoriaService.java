package com.campuslost.backend.service;

import com.campuslost.backend.entity.categoria;
import java.util.List;
public interface categoriaService {
	  categoria guardar(categoria categoria);

	   List<categoria> listar();
	    
	   categoria obtenerPorId(Integer id);
	    
	   void eliminar(Integer id);

}

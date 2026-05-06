package com.campuslost.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "preguntas_verificacion")
public class preguntaVerificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pregunta")
    private Integer idPregunta;

    @ManyToOne
    @JoinColumn(name = "id_objeto")
    private objeto objeto;

    @Column(name = "pregunta", nullable = false)
    private String pregunta;

    @Column(name = "respuesta", nullable = false)
    private String respuesta;

    @Column(name = "es_predefinida")
    private Boolean esPredefinida = false;

    public Integer getIdPregunta() { return idPregunta; }
    public void setIdPregunta(Integer idPregunta) { this.idPregunta = idPregunta; }

    public objeto getObjeto() { return objeto; }
    public void setObjeto(objeto objeto) { this.objeto = objeto; }

    public String getPregunta() { return pregunta; }
    public void setPregunta(String pregunta) { this.pregunta = pregunta; }

    public String getRespuesta() { return respuesta; }
    public void setRespuesta(String respuesta) { this.respuesta = respuesta; }

    public Boolean getEsPredefinida() { return esPredefinida; }
    public void setEsPredefinida(Boolean esPredefinida) { this.esPredefinida = esPredefinida; }
}
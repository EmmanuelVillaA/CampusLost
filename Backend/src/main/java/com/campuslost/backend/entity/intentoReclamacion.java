package com.campuslost.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "intentos_reclamacion")
public class intentoReclamacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_intento")
    private Integer idIntento;

    @ManyToOne
    @JoinColumn(name = "id_objeto")
    private objeto objeto;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private usuario usuario;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private EstadoIntento estado = EstadoIntento.pendiente;

    @PrePersist
    public void prePersist() {
        fecha = LocalDateTime.now();
    }

    public enum EstadoIntento {
        pendiente, aprobado, rechazado
    }

    public Integer getIdIntento() { return idIntento; }
    public void setIdIntento(Integer idIntento) { this.idIntento = idIntento; }

    public objeto getObjeto() { return objeto; }
    public void setObjeto(objeto objeto) { this.objeto = objeto; }

    public usuario getUsuario() { return usuario; }
    public void setUsuario(usuario usuario) { this.usuario = usuario; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public EstadoIntento getEstado() { return estado; }
    public void setEstado(EstadoIntento estado) { this.estado = estado; }
}
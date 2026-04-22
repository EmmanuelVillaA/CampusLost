import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';
import { firstValueFrom } from 'rxjs';

import { ObjetoService } from '../services/objeto';
import { ObjetoDto } from '../dto/objetoDTO';
import { EstadoService } from '../services/estado';
import { EstadoDto } from '../dto/estadoDTO';
import { CategoriaDto, CategoriaService } from '../services/categoria';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class inicio implements OnInit {
  private readonly objetoService = inject(ObjetoService);
  private readonly estadoService = inject(EstadoService);
  private readonly categoriaService = inject(CategoriaService);
  private readonly platformId = inject(PLATFORM_ID);

  objetos: ObjetoDto[] = [];
  objetosView: ObjetoDto[] = [];

  estados: EstadoDto[] = [];
  estadosLoading = false;

  categorias: CategoriaDto[] = [];
  categoriasLoading = false;

  cargando = false;
  buscando = false;
  guardando = false;

  searchTerm = '';
  formVisible = false;
  editMode = false;
  estadoOnlyMode = false;
  estadoId: number | null = null;
  categoriaId: number | null = null;
  form: ObjetoDto = { titulo: '', descripcion: '', lugar: '', fecha: '' };
  private originalEditingItem: ObjetoDto | null = null;

  totalRegistrados = 0;
  totalEntregados = 0;
  totalAbandonados = 0;

  mostrarConfirmCerrarSesion = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  private getLoggedUserId(): number | null {
    const raw = this.authService.obtenerSesion();
    if (!raw) return null;

    try {
      const data = JSON.parse(raw);
      const id =
        data?.idUsuario ??
        data?.id_usuario ??
        data?.usuario?.idUsuario ??
        data?.usuario?.id_usuario;

      const n = Number(id);
      return Number.isFinite(n) ? n : null;
    } catch {
      return null;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargando = true;
      setTimeout(() => {
        void this.cargar();
        void this.cargarEstados();
        void this.cargarCategorias();
      }, 0);
    }
  }

  private getId(item: ObjetoDto): number | undefined {
    return item.idObjeto ?? item.id_objeto ?? (item as any)?.id;
  }

  private getEstadoId(item: ObjetoDto): number | undefined {
    return (
      item.idEstado ??
      item.id_estado ??
      item.estado?.idEstado ??
      item.estado?.id_estado ??
      (item as any)?.estado?.idEstado ??
      (item as any)?.estado?.id_estado
    );
  }

  private getCategoriaId(item: ObjetoDto): number | undefined {
    return (
      item.idCategoria ??
      item.id_categoria ??
      item.categoria?.idCategoria ??
      item.categoria?.id_categoria ??
      (item as any)?.categoria?.idCategoria ??
      (item as any)?.categoria?.id_categoria
    );
  }

  private normalizeEstadoNombre(raw: string | undefined | null): string {
    return (raw ?? '').trim();
  }

  getEstadoNombre(item: ObjetoDto): string {
    const nombre =
      item.estadoNombre ??
      item.estado?.nombre ??
      (item as any)?.estado?.nombre ??
      (item as any)?.estado ??
      (item as any)?.nombreEstado;
    return this.normalizeEstadoNombre(typeof nombre === 'string' ? nombre : '');
  }

  getCategoriaNombre(item: ObjetoDto): string {
    const nombre =
      item.categoriaNombre ??
      item.categoria?.nombre ??
      (item as any)?.categoria?.nombre ??
      (item as any)?.categoria ??
      (item as any)?.nombreCategoria;
    return (typeof nombre === 'string' ? nombre : '').trim();
  }

  getBadgeClass(item: ObjetoDto): string {
    const estado = this.getEstadoNombre(item).toLowerCase();
    if (estado.includes('entreg')) return 'bg-success';
    if (estado.includes('registr')) return 'bg-primary';
    if (estado.includes('abandon')) return 'bg-danger';
    return 'bg-secondary';
  }

  getFechaDisplay(item: ObjetoDto): string {
    const raw = (item.fecha ?? item.fechaEvento ?? item.fecha_evento ?? '').trim();
    if (!raw) return '';

    // Si viene como ISO (YYYY-MM-DD...), lo mostramos como DD/MM/YYYY
    const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (m) return `${m[3]}/${m[2]}/${m[1]}`;
    return raw;
  }

  async cargar(): Promise<void> {
    this.cargando = true;
    try {
      this.objetos = await firstValueFrom(this.objetoService.listar());
      this.aplicarFiltroLocal();
      this.recalcularTotales();
    } catch (error) {
      console.error(error);
      alert('No se pudo cargar la lista de objetos.');
    } finally {
      this.cargando = false;
    }
  }

  async cargarEstados(): Promise<void> {
    this.estadosLoading = true;
    try {
      this.estados = await firstValueFrom(this.estadoService.listar());
    } catch (error) {
      console.warn('No se pudieron cargar estados (endpoint /api/estados).', error);
      this.estados = [];
    } finally {
      this.estadosLoading = false;
    }
  }

  async cargarCategorias(): Promise<void> {
    this.categoriasLoading = true;
    try {
      this.categorias = await firstValueFrom(this.categoriaService.listar());
    } catch (error) {
      console.warn('No se pudieron cargar categorías (endpoint /api/categorias).', error);
      this.categorias = [];
    } finally {
      this.categoriasLoading = false;
    }
  }

  recalcularTotales(): void {
    this.totalRegistrados = 0;
    this.totalEntregados = 0;
    this.totalAbandonados = 0;

    for (const item of this.objetos) {
      const e = this.getEstadoNombre(item).toLowerCase();
      if (e.includes('entreg')) this.totalEntregados += 1;
      else if (e.includes('abandon')) this.totalAbandonados += 1;
      else if (e.includes('registr')) this.totalRegistrados += 1;
    }
  }

  aplicarFiltroLocal(): void {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) {
      this.objetosView = [...this.objetos];
      return;
    }

    this.objetosView = this.objetos.filter((o) => {
      const titulo = (o.titulo ?? '').toLowerCase();
      const lugar = (o.lugar ?? '').toLowerCase();
      const descripcion = (o.descripcion ?? '').toLowerCase();
      const estado = this.getEstadoNombre(o).toLowerCase();
      const categoria = this.getCategoriaNombre(o).toLowerCase();
      return (
        titulo.includes(q) ||
        lugar.includes(q) ||
        descripcion.includes(q) ||
        estado.includes(q) ||
        categoria.includes(q)
      );
    });
  }

  async buscar(): Promise<void> {
    const q = this.searchTerm.trim();
    if (!q) {
      this.aplicarFiltroLocal();
      return;
    }

    const numericId = Number(q);
    if (!Number.isNaN(numericId) && Number.isInteger(numericId)) {
      this.buscando = true;
      try {
        const item = await firstValueFrom(this.objetoService.obtenerPorId(numericId));
        this.objetosView = item ? [item] : [];
      } catch (error) {
        console.error(error);
        this.objetosView = [];
        alert('No se encontró el objeto con ese ID.');
      } finally {
        this.buscando = false;
      }
      return;
    }

    this.aplicarFiltroLocal();
  }

  toggleRegistrar(): void {
    if (this.formVisible && !this.editMode) {
      this.formVisible = false;
      return;
    }
    this.formVisible = true;
    this.editMode = false;
    this.estadoOnlyMode = false;
    this.originalEditingItem = null;
    this.estadoId = null;
    this.categoriaId = null;
    this.form = { titulo: '', descripcion: '', lugar: '', fecha: '' };
  }

  editar(item: ObjetoDto): void {
    this.formVisible = true;
    this.editMode = true;
    this.estadoOnlyMode = false;
    this.originalEditingItem = item;
    this.estadoId = this.getEstadoId(item) ?? null;
    this.categoriaId = this.getCategoriaId(item) ?? null;
    this.form = {
      idObjeto: this.getId(item),
      titulo: item.titulo ?? '',
      descripcion: item.descripcion ?? '',
      lugar: item.lugar ?? '',
      fecha: item.fecha ?? item.fechaEvento ?? item.fecha_evento ?? '',
      idEstado: this.getEstadoId(item),
      idCategoria: this.getCategoriaId(item),
    };
  }

  editarEstado(item: ObjetoDto): void {
    this.formVisible = true;
    this.editMode = true;
    this.estadoOnlyMode = true;
    this.originalEditingItem = item;
    this.estadoId = this.getEstadoId(item) ?? null;
    this.categoriaId = this.getCategoriaId(item) ?? null;
    this.form = {
      idObjeto: this.getId(item),
      idEstado: this.getEstadoId(item),
      idCategoria: this.getCategoriaId(item),
    };
  }

  cancelar(): void {
    this.formVisible = false;
    this.editMode = false;
    this.estadoOnlyMode = false;
    this.originalEditingItem = null;
    this.estadoId = null;
    this.categoriaId = null;
    this.form = { titulo: '', descripcion: '', lugar: '', fecha: '' };
  }

  private buildPayload(
    base: ObjetoDto | null,
    overrides: ObjetoDto,
    estadoId: number | null,
    categoriaId: number | null,
    userId: number | null
  ): ObjetoDto {
    const merged: ObjetoDto = { ...(base ?? {}), ...(overrides ?? {}) };

    const fecha = (merged.fecha ?? merged.fechaEvento ?? merged.fecha_evento ?? '').trim();
    if (fecha) {
      merged.fecha = fecha;
      merged.fechaEvento = fecha;
      merged.fecha_evento = fecha;
    }

    if (estadoId != null && !Number.isNaN(Number(estadoId))) {
      const numericEstadoId = Number(estadoId);
      merged.idEstado = numericEstadoId;
      merged.id_estado = numericEstadoId;
      merged.estado = { ...(merged.estado ?? {}), idEstado: numericEstadoId };
    }

    if (categoriaId != null && !Number.isNaN(Number(categoriaId))) {
      const numericCategoriaId = Number(categoriaId);
      merged.idCategoria = numericCategoriaId;
      merged.id_categoria = numericCategoriaId;
      merged.categoria = { ...(merged.categoria ?? {}), idCategoria: numericCategoriaId };
    }

    if (userId != null && !Number.isNaN(Number(userId))) {
      const numericUserId = Number(userId);
      merged.idUsuario = numericUserId;
      merged.id_usuario = numericUserId;
      merged.usuario = { ...(merged.usuario ?? {}), idUsuario: numericUserId };
    }

    return merged;
  }

  async guardar(): Promise<void> {
    const titulo = (this.form.titulo ?? '').trim();
    const lugar = (this.form.lugar ?? '').trim();
    const descripcion = (this.form.descripcion ?? '').trim();
    const fecha = (this.form.fecha ?? '').trim();

    const userId = this.getLoggedUserId();

    if (!this.estadoOnlyMode) {
      if (!titulo || !lugar) {
        alert('Título y lugar son obligatorios.');
        return;
      }

      if (!fecha) {
        alert('La fecha es obligatoria.');
        return;
      }

      if (userId == null) {
        alert('No se pudo identificar el usuario de la sesión (id_usuario). Inicia sesión de nuevo.');
        return;
      }

      if (this.categoriaId == null || Number.isNaN(Number(this.categoriaId))) {
        alert('La categoría es obligatoria.');
        return;
      }
    }

    this.guardando = true;
    try {
      if (this.editMode) {
        const id = this.getId(this.form) ?? (this.originalEditingItem ? this.getId(this.originalEditingItem) : undefined);
        if (id == null) {
          alert('No se pudo determinar el ID del objeto a actualizar.');
          return;
        }

        const payload = this.buildPayload(
          this.originalEditingItem,
          this.estadoOnlyMode
            ? { idObjeto: id }
            : { idObjeto: id, titulo, lugar, descripcion, fecha },
          this.estadoId,
          this.categoriaId,
          userId
        );

        await firstValueFrom(this.objetoService.actualizar(id, payload));
      } else {
        const payload = this.buildPayload(null, { titulo, lugar, descripcion, fecha }, this.estadoId, this.categoriaId, userId);
        await firstValueFrom(this.objetoService.crear(payload));
      }

      this.cancelar();
      void this.cargar();
    } catch (error) {
      console.error(error);
      alert('No se pudo guardar el objeto.');
    } finally {
      this.guardando = false;
    }
  }

  abrirConfirmCerrarSesion(): void {
    this.mostrarConfirmCerrarSesion = true;
  }

  cancelarCerrarSesion(): void {
    this.mostrarConfirmCerrarSesion = false;
  }

  confirmarCerrarSesion(): void {
    this.mostrarConfirmCerrarSesion = false;
    this.authService.cerrarSesion();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}

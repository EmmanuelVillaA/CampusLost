import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mb-3">
      <div class="d-flex align-items-center gap-2">
        <label class="mb-0">Mostrar</label>
        <select
          class="form-select form-select-sm w-auto"
          [(ngModel)]="pageSize"
          (ngModelChange)="pageSizeChange.emit($event)"
        >
          <option *ngFor="let size of pageSizeOptions" [ngValue]="size">{{ size }}</option>
        </select>
        <label class="mb-0">registros</label>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button
          class="btn btn-outline-primary btn-sm"
          type="button"
          (click)="navigate(currentPage - 1)"
          [disabled]="currentPage <= 1"
        >
          Anterior
        </button>
        <span class="text-muted">Página {{ currentPage }} de {{ totalPages }}</span>
        <button
          class="btn btn-outline-primary btn-sm"
          type="button"
          (click)="navigate(currentPage + 1)"
          [disabled]="currentPage >= totalPages"
        >
          Siguiente
        </button>
      </div>
    </div>
  `,
})
export class PaginationControls {
  @Input() pageSizeOptions: number[] = [5, 10, 15, 20, 30];
  @Input() pageSize = 5;
  @Input() currentPage = 1;
  @Input() totalPages = 1;

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  navigate(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.pageChange.emit(page);
  }
}

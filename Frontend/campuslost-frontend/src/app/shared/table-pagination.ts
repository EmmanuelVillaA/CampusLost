export class TablePagination<T> {
  pageSizeOptions = [5, 10, 15, 20, 30];

  private _data: T[] = [];
  private _pageSize = 5;
  currentPage = 1;

  get data(): T[] {
    return this._data;
  }

  set data(value: T[]) {
    this._data = value ?? [];
    this.currentPage = 1;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set pageSize(value: number) {
    if (!Number.isFinite(value) || value < 1) {
      return;
    }
    this._pageSize = value;
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this._data.length / this._pageSize));
  }

  get pageData(): T[] {
    const start = (this.currentPage - 1) * this._pageSize;
    return this._data.slice(start, start + this._pageSize);
  }

  setPage(page: number): void {
    if (!Number.isFinite(page)) {
      return;
    }
    if (page < 1) {
      this.currentPage = 1;
      return;
    }
    if (page > this.totalPages) {
      this.currentPage = this.totalPages;
      return;
    }
    this.currentPage = page;
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { PaginationDTO } from '../../models/paginationDTO';
import { SERVICE_CRUD_TOKEN } from '../../providers/providers';
import { IServiceCRUD } from '../../interfaces/IServiceCRUD';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ListGenericComponent } from '../list-generic/list-generic.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-index-entity',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListGenericComponent, MatTableModule, MatPaginatorModule, IndexEntityComponent],
  templateUrl: './index-entity.component.html',
  styleUrl: './index-entity.component.css'
})
export class IndexEntityComponent<TDTO, TCreateDTO> {
  @Input({required: true})
  title!: string;

  @Input({required: true})
  createRoute!: string;

  @Input({required: true})
  editRoute!: string;

  @Input()
  columnsToShow = ['title', 'accions'];

  serviceCRUD = inject(SERVICE_CRUD_TOKEN) as IServiceCRUD<TDTO, TCreateDTO>;

  pagination: PaginationDTO = { page: 1, recordsPerPage: 10 };
  todos!: TDTO[];
  totalAmountRecords!: number;

  constructor() {
    this.loadRecords();
  }

  updatePagination(datos: PageEvent) {
    this.pagination = { page: datos.pageIndex + 1, recordsPerPage: datos.pageSize };
    this.loadRecords();

  }

  loadRecords() {
    this.serviceCRUD.getPagination(this.pagination).subscribe((response: HttpResponse<TDTO[]>) => {
      this.todos = response.body as TDTO[];
      const head = response.headers.get("total-amount-of-records") as string;
      this.totalAmountRecords = parseInt(head, 10);
    })
  }

  delete(id: number) {
    this.serviceCRUD.delete(id)
      .subscribe(() => {
        this.pagination.page = 1;
        this.loadRecords();
      })
  }

  firstCapitalLetter(value: string){
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

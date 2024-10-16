import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserDTO } from '../../share/models/security';
import { SecurityService } from '../security.service';
import { PaginationDTO } from '../../share/models/paginationDTO';
import Swal from 'sweetalert2';
import { ListGenericComponent } from "../../share/component/list-generic/list-generic.component";

@Component({
  selector: 'app-index-user',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatPaginatorModule, ListGenericComponent],
  templateUrl: './index-user.component.html',
  styleUrl: './index-user.component.css'
})
export class IndexUserComponent {
  columnsToShow = ['email', 'accions'];
  pagination: PaginationDTO = {page: 1, recordsPerPage: 10};
  totalAmountRecords!: number;

  users!: UserDTO[];

  securityService = inject(SecurityService);

  constructor(){
    this.loadRecords();
  }

  loadRecords(){
    this.securityService.getPaginatedUsers(this.pagination)
    .subscribe(response => {
      this.users = response.body as UserDTO[];
      const header = response.headers.get("total-records-amount") as string;
      this.totalAmountRecords = parseInt(header, 10);
    })
  }

  updatePagination(datos: PageEvent){
    this.pagination = {page: datos.pageIndex + 1, recordsPerPage: datos.pageSize};
    this.loadRecords();
  }

 makeAdmin(email: string){
  this.securityService.makeAdmin(email)
  .subscribe(() => {
    Swal.fire("Successful", `The user ${email} now is admin`, "success");
  });
 }
 
 removeAdmin(email: string){
  this.securityService.removeAdmin(email)
  .subscribe(() => {
    Swal.fire("Successful", `The user ${email} is no longer admin`, "success");
  });
 }


}

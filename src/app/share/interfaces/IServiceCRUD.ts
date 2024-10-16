import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginationDTO } from "../models/paginationDTO";


export interface IServiceCRUD<TDTO, TCreationDTO>{
    getPagination(pagination: PaginationDTO): Observable<HttpResponse<TDTO[]>>;
    getById(id: number): Observable<TDTO>;
    update(id: number, entity: TCreationDTO): Observable<any>;
    create(entity: TCreationDTO): Observable<any>;
    delete(id: number): Observable<any>;
}
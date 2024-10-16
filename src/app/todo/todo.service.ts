import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginationDTO } from '../share/models/paginationDTO';
import { TodoCreateDTO, TodoDTO } from './todo';
import { IServiceCRUD } from '../share/interfaces/IServiceCRUD';
import { buildQueryParams } from '../share/functions/buildQueryParams';


@Injectable({
  providedIn: 'root'
})

export class TodoService implements IServiceCRUD<TodoDTO, TodoCreateDTO>{

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + 'todo';

  constructor() { }
  
  getPagination(pagination: PaginationDTO): Observable<HttpResponse<TodoDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<TodoDTO[]>(`${this.urlBase}/todolist`, { params: queryParams, observe: 'response' });
  }

  public getAll(): Observable<TodoDTO[]>{
    return this.http.get<TodoDTO[]>(`${this.urlBase}/todos`);
  }

  public getById(id: number): Observable<TodoDTO>{
    return this.http.get<TodoDTO>(`${this.urlBase}/${id}`);
  }

  public update(id: number, todo: TodoCreateDTO): Observable<any>{
    return this.http.put(`${this.urlBase}/${id}`, todo);
  }

  public create(todo: TodoCreateDTO): Observable<any>{
    return this.http.post(this.urlBase, todo);
  }

  public delete (id: number): Observable<any>{
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}


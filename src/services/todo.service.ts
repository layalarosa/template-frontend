import { inject, Injectable } from '@angular/core';
import { TodoDTO } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private http = inject(HttpClient);

  constructor() { }

  public getAll(): Observable<TodoDTO[]> {
    return this.http.get<TodoDTO[]>("https://localhost:7214/api/todos");
  }
}

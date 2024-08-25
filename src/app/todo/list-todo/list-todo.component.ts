import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css'
})
export class ListTodoComponent {

  todosService = inject(TodoService)

  constructor(){
    this.todosService.getAll().subscribe(todos => {
     console.log(todos);
    })
    
  }
}

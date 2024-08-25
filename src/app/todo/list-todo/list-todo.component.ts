import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-todo',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './list-todo.component.html',
  styleUrl: './list-todo.component.css'
})
export class ListTodoComponent {

}

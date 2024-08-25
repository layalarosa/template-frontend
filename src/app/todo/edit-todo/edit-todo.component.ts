import { Component, Input, numberAttribute } from '@angular/core';


@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {

  // Parametros de URL
  @Input({transform: numberAttribute})
  id!: number;
}

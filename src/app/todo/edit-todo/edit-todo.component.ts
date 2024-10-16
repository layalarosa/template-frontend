import { Component, Input, numberAttribute } from '@angular/core';
import { FormTodoComponent } from '../form-todo/form-todo.component';
import { ShowErrorsComponent } from '../../share/component/show-errors/show-errors.component';
import { TodoService } from '../todo.service';
import { SERVICE_CRUD_TOKEN } from '../../share/providers/providers';
import { EditEntityComponent } from "../../share/component/edit-entity/edit-entity.component";



@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [FormTodoComponent, ShowErrorsComponent, EditTodoComponent, EditEntityComponent],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
  providers: [
    { provide: SERVICE_CRUD_TOKEN, useClass: TodoService }
  ]
})
export class EditTodoComponent {

  // Parametros de URL
  @Input({ transform: numberAttribute })
  id!: number;
  formTodo = FormTodoComponent;
}

import { Component } from '@angular/core';
import { SERVICE_CRUD_TOKEN } from '../../share/providers/providers';
import { TodoService } from '../todo.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormTodoComponent } from '../form-todo/form-todo.component';
import { ShowErrorsComponent } from '../../share/component/show-errors/show-errors.component';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormTodoComponent, ShowErrorsComponent, CreateTodoComponent],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
  providers: [
    {provide: SERVICE_CRUD_TOKEN, useClass: TodoService}
  ]
})
export class CreateTodoComponent {
   formTodo = FormTodoComponent;
}

import { Component } from '@angular/core';
import { IndexEntityComponent } from "../../share/component/index-entity/index-entity.component";
import { TodoService } from '../todo.service';
import { SERVICE_CRUD_TOKEN } from '../../share/providers/providers';

@Component({
  selector: 'app-index-todo',
  standalone: true,
  imports: [IndexEntityComponent],
  templateUrl: './index-todo.component.html',
  styleUrl: './index-todo.component.css',
  providers: [
    {provide: SERVICE_CRUD_TOKEN, useClass: TodoService}
  ]
})
export class IndexTodoComponent {

}

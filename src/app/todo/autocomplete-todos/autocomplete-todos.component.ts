import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoAutoCompleteDTO } from '../todo';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-autocomplete-todos',
  standalone: true,
  imports: [MatAutocompleteModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, FormsModule, MatTableModule, MatInputModule,
    DragDropModule
  ],
  templateUrl: './autocomplete-todos.component.html',
  styleUrl: './autocomplete-todos.component.css'
})
export class AutocompleteTodosComponent implements OnInit {

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      if (typeof value === 'string' && value){
        this.todosService.getByTitle(value).subscribe(todos => {
          this.todos = todos;
        });
      }
    });
  }
  
  control = new FormControl();

  todos: TodoAutoCompleteDTO[] = [];

  @Input({required: true})
  todosSelected: TodoAutoCompleteDTO[] = [];

  todosService = inject(TodoService);

  columnsToShow = ['title', 'picture', 'description', 'accions'];

  @ViewChild(MatTable) table!: MatTable<TodoAutoCompleteDTO>;

  todoSelected(event: MatAutocompleteSelectedEvent) {
    this.todosSelected.push(event.option.value);
    this.control.patchValue('');

    if (this.table != undefined) {
      this.table.renderRows();
    }
  }

  endDrag(event: CdkDragDrop<any[]>){
    const indexPrevious = this.todosSelected.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.todosSelected, indexPrevious, event.currentIndex);
    this.table.renderRows();
  }

  delete(actor: TodoAutoCompleteDTO) {
    const index = this.todosSelected.findIndex((a: TodoAutoCompleteDTO) => a.id === actor.id);
    this.todosSelected.splice(index, 1);
    this.table.renderRows();
  }

}

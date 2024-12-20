import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { TodoCreateDTO, TodoDTO } from '../todo';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputImgComponent } from "../../share/component/input-img/input-img.component";

@Component({
  selector: 'app-form-todo',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, InputImgComponent],
  templateUrl: './form-todo.component.html',
  styleUrl: './form-todo.component.css'
})
export class FormTodoComponent implements OnInit {
  ngOnInit(): void {
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  @Input()
  model?: TodoDTO;

  @Output()
  postForm = new EventEmitter<TodoCreateDTO>();

  private formBuilder = inject(FormBuilder);

  // form = this.formbuilder.group({
  //   title: ['', {validators: [Validators.required, firstCapitalLetter(), Validators.maxLength(50)]}]
  // })

  form = this.formBuilder.group({
    title: ['', {
      validators: [Validators.required]
    }],
    description: ['', {
      validators: [Validators.required]
    }],
   
    picture: new FormControl<File | string | null>(null)
  })

  

  getErrorFieldName(): string {
    let title = this.form.controls.title;

    if (title.hasError('required')){
      return "The name field is required";
    }

    if (title.hasError('maxlength')){
      return `The name field cannot be longer than ${title.getError('maxlength').requiredLength} characters`;
    }

    if (title.hasError('firstCapitalLetter')){
      return title.getError('firstCapitalLetter').mensaje;
    }

    return "";

  }

  selectedFile(file: File){
    this.form.controls.picture.setValue(file);
  }

  saveChanges() {
    if (!this.form.valid){
      return;
    }

    const todo = this.form.value as TodoCreateDTO;
    this.postForm.emit(todo);

    if (typeof todo.picture === "string"){
      todo.picture = undefined;
    }

  }

}
// function firstCapitalLetter(): any {
//   throw new Error('Function not implemented.');
// }


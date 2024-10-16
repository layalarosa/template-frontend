import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentialsDTO } from '../../share/models/security';
import { ShowErrorsComponent } from '../../share/component/show-errors/show-errors.component';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [ShowErrorsComponent, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css'
})
export class AuthenticationFormComponent {

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    email: ['', {validators: [Validators.required, Validators.email]}],
    password: ['', {validators: [Validators.required]}]
  })

  @Input({required: true})
  title!: string;

  @Input()
  errors: string[] = [];

  @Output()
  postForm = new EventEmitter<UserCredentialsDTO>();

  getErrorMessageEmail(): string{
    let field = this.form.controls.email;

    if (field.hasError('required')){
      return 'The field is required';

    }

    if (field.hasError('email')){
      return 'The email field is required';

    }
    return '';
  }

  getErrorMessagePassword(): string{
    let field = this.form.controls.password;

    if (field.hasError('required')){
      return 'The field password is required';

    }

    return '';
  }

  saveChanges(){
    if (!this.form.valid){
      return;
    }

    const credentials = this.form.value as UserCredentialsDTO;
    this.postForm.emit(credentials);

  }

}

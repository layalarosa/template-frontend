import { Component, inject } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import { UserCredentialsDTO } from '../../share/models/security';
import { extractErrorsIdentity } from '../../share/extractErrors';
import { AuthenticationFormComponent } from "../authentication-form/authentication-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];

  login(credentials: UserCredentialsDTO){
    this.securityService.login(credentials)
    .subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: err =>{
        const errors = extractErrorsIdentity(err);
        this.errors = errors;
      }
    })
  }

}

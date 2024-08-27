import { Component, inject } from '@angular/core';
import { SecurityService } from '../security.service';
import { UserCredentialsDTO } from '../../../models/security';
import { Router } from '@angular/router';
import { extractErrorsIdentity } from '../../share/extractErrors';
import { AuthenticationFormComponent } from "../authentication-form/authentication-form.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthenticationFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  securityService = inject(SecurityService);
  router = inject(Router);
  errors: string[] = [];

  register(credentials: UserCredentialsDTO){
    this.securityService.register(credentials)
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

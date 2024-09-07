import { Component, inject, Input } from '@angular/core';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-authorized',
  standalone: true,
  imports: [],
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css'
})
export class AuthorizedComponent {
  securityService = inject(SecurityService);
  @Input()
  role?: string;

  authorized(): boolean{
    if (this.role){
      return this.securityService.getRole() === this.role;
    }
    return this.securityService.logging();
  }
}

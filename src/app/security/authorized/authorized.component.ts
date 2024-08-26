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
  rol?: string;

  authorized(): boolean{
    if (this.rol){
      return this.securityService.getRole() === this.rol;
    }
    return this.securityService.logging();
  }
}

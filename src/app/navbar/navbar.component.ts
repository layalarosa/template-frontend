import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { RouterLink } from '@angular/router';
import { AuthorizedComponent } from "../security/authorized/authorized.component";
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, AuthorizedComponent,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  securityService = inject(SecurityService);
}

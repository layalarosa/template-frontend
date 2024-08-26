import { Component } from '@angular/core';
import { AuthorizedComponent } from "../security/authorized/authorized.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [AuthorizedComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}

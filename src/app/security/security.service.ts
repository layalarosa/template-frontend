import { inject, Injectable } from '@angular/core';
import { AuthenticationResponseDTO, UserCredentialsDTO } from '../../models/security';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/user';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration'

  register(credentials : UserCredentialsDTO): Observable<AuthenticationResponseDTO>{
    return this.http.post<AuthenticationResponseDTO>(`${this.urlBase}/register`, credentials)
    .pipe(
      tap(authenticationResponse => this.saveToken(authenticationResponse))
    )
  }

  login(credentials : UserCredentialsDTO): Observable<AuthenticationResponseDTO>{
    return this.http.post<AuthenticationResponseDTO>(`${this.urlBase}/login`, credentials)
    .pipe(
      tap((authenticationResponse: AuthenticationResponseDTO) => this.saveToken(authenticationResponse))
    )
  }
  
  saveToken(authenticationResponse: AuthenticationResponseDTO){
    localStorage.setItem(this.keyToken, authenticationResponse.token);
    localStorage.setItem(this.keyExpiration, authenticationResponse.expiration.toString());
  }
  

  logging(): boolean {
    
    const token = localStorage.getItem(this.keyToken);

    if (!token){
      return false;
    }

    const expiration = localStorage.getItem(this.keyExpiration)!;
    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()){
      this.logout();
      return false;
    }

    return true;
  }

  logout(){
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpiration);
  }

  getRole(): string {
    return '';
  }
}

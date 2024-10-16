import { inject, Injectable } from '@angular/core';
import { AuthenticationResponseDTO, UserCredentialsDTO, UserDTO } from '../share/models/security';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PaginationDTO } from '../share/models/paginationDTO';
import { buildQueryParams } from '../share/functions/buildQueryParams';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + 'user';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration'


  getPaginatedUsers(Pagination: PaginationDTO): Observable<HttpResponse<UserDTO[]>> {
    let queryParams = buildQueryParams(Pagination);
    return this.http.get<UserDTO[]>(`${this.urlBase}/userlist`, { params: queryParams, observe: 'response' });
  }

  makeAdmin(email: string) {
    return this.http.post(`${this.urlBase}/makeadmin`, { email });
  }

  removeAdmin(email: string) {
    return this.http.post(`${this.urlBase}/removeadmin`, { email });
  }

  getToken(): string | null{
    return localStorage.getItem(this.keyToken)
  }

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

  getFieldJWT(field: string): string {
    const token = localStorage.getItem(this.keyToken)
    if (!token){return ''}
    var dataToken = JSON.parse(atob(token.split('.')[1]))
    return dataToken[field];
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
    const isAdmin = this.getFieldJWT('isadmin');
    if (isAdmin) {
      return 'admin'
    } else {
      return '';
    }
  }
}

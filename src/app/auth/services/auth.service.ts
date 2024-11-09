import { Injectable, Signal, signal, computed, inject } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // Signaux pour l'état d'authentification et les informations de l'utilisateur
  private _isAuthenticated = signal<boolean>(false);
  private _userId = signal<string | null>(null);
  private _userEmail = signal<string | null>(null);

  // Signaux dérivés avec types explicites
  isAuthenticated: Signal<boolean> = computed(() => this._isAuthenticated());
  userId: Signal<string | null> = computed(() => this._userId());
  userEmail: Signal<string | null> = computed(() => this._userEmail());

  constructor() {
    this.loadUserState();
  }

  // Méthode de connexion avec mise à jour des signaux
  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    console.log('Logging in with credentials:', credentials); // Log avant l'appel HTTP

    return this.http
      .post<LoginResponseDto>(
        API.login,
        {
          username: credentials.username, // Utiliser le nom d'utilisateur
          password: credentials.password, // Utiliser le mot de passe
          expiresInMins: 30, // Définir la durée d'expiration du jeton (optionnel)
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        tap((response: LoginResponseDto) => {
          console.log('Received response:', response); // Log de la réponse du serveur

          // Sauvegarde dans le localStorage
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('userId', response.id.toString());

          // Mise à jour des signaux
          this._isAuthenticated.set(true);
          this._userId.set(response.username); // Ici vous mettez username au lieu de id
          this._userEmail.set(response.email);
        })
      );
  }

  // Chargement de l'état utilisateur depuis le localStorage
  private loadUserState(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      this._isAuthenticated.set(true);
      this._userId.set(userId); // Conversion de string à number
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Réinitialisation des signaux
    this._isAuthenticated.set(false);
    this._userId.set(null);
    this._userEmail.set(null);
  }
}

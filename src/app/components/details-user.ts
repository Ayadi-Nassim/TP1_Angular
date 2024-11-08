import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true, // Déclare le composant comme autonome
  imports: [CommonModule], // Import des modules nécessaires pour les directives Angular
  template: `
    <div *ngIf="authService.isAuthenticated(); else notAuthenticated">
      <h1>Détails de l'utilisateur</h1>
      <p><strong>ID Utilisateur:</strong> {{ userId() }}</p>
      <p><strong>Email:</strong> {{ userEmail() }}</p>
    </div>
    <ng-template #notAuthenticated>
      <p>Veuillez vous connecter pour voir les détails de l'utilisateur.</p>
    </ng-template>
  `,
})
export class DetailsComponent implements OnInit {
  authService = inject(AuthService); // Injection du service d'authentification
  userId = this..userId; // Signal de l'ID utilisateur
  userEmail = this.authService._userEmail; // Signal de l'email utilisateur

  ngOnInit(): void {
    console.log('User ID:', this.userId());
    console.log('User Email:', this.userEmail());
  }
}

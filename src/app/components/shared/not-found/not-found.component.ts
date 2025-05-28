import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="not-found-container">
      <mat-icon class="error-icon">sentiment_very_dissatisfied</mat-icon>
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <button mat-raised-button color="primary" routerLink="/dashboard">
        Retour à l'accueil
      </button>
    </div>
  `,
  styles: [`
    .not-found-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      background-color: #f5f5f5;
    }

    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ff9800;
      margin-bottom: 24px;
    }

    h1 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 16px;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 32px;
      max-width: 500px;
    }

    button {
      font-size: 1.1rem;
      padding: 8px 24px;
    }
  `]
})
export class NotFoundComponent {} 
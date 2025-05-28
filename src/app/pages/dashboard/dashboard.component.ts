import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Tableau de bord INSEA</h1>
        <p class="welcome-text">Bienvenue, {{studentName}}</p>
      </header>

      <div class="dashboard-grid">
        <!-- Quick Stats -->
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon courses">
              <mat-icon>school</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Cours</h3>
              <p class="stat-number">6</p>
              <p class="stat-label">Cours en cours</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon assignments">
              <mat-icon>assignment</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Devoirs</h3>
              <p class="stat-number">3</p>
              <p class="stat-label">À rendre</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon attendance">
              <mat-icon>how_to_reg</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Présence</h3>
              <p class="stat-number">95%</p>
              <p class="stat-label">Taux de présence</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon average">
              <mat-icon>grade</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Moyenne</h3>
              <p class="stat-number">16.5</p>
              <p class="stat-label">Moyenne générale</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Upcoming Events -->
      <section class="upcoming-events">
        <h2>Événements à venir</h2>
        <div class="events-grid">
          <mat-card class="event-card">
            <mat-card-content>
              <div class="event-date">
                <span class="day">15</span>
                <span class="month">Mai</span>
              </div>
              <div class="event-details">
                <h3>Examen Statistiques</h3>
                <p>Salle: A204</p>
                <p>09:00 - 11:00</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="event-card">
            <mat-card-content>
              <div class="event-date">
                <span class="day">18</span>
                <span class="month">Mai</span>
              </div>
              <div class="event-details">
                <h3>Présentation Projet</h3>
                <p>Salle: Amphi B</p>
                <p>14:00 - 16:00</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-actions">
        <h2>Actions rapides</h2>
        <div class="actions-grid">
          <button mat-raised-button color="primary" routerLink="/courses">
            <mat-icon>school</mat-icon>
            Voir mes cours
          </button>
          <button mat-raised-button color="primary" routerLink="/assignments">
            <mat-icon>assignment</mat-icon>
            Gérer mes devoirs
          </button>
          <button mat-raised-button color="primary" routerLink="/resources">
            <mat-icon>library_books</mat-icon>
            Ressources
          </button>
          <button mat-raised-button color="primary" routerLink="/calendar">
            <mat-icon>event</mat-icon>
            Calendrier
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
      
      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 500;
        color: #1b5e20;
      }

      .welcome-text {
        color: #666;
        font-size: 1.1rem;
        margin: 0.5rem 0 0;
      }
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      mat-card-content {
        display: flex;
        align-items: center;
        padding: 1.5rem;
      }

      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;

        mat-icon {
          font-size: 30px;
          width: 30px;
          height: 30px;
          color: white;
        }

        &.courses {
          background-color: #1b5e20;
        }

        &.assignments {
          background-color: #e65100;
        }

        &.attendance {
          background-color: #0277bd;
        }

        &.average {
          background-color: #6a1b9a;
        }
      }

      .stat-info {
        h3 {
          margin: 0;
          font-size: 1rem;
          color: #666;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 500;
          margin: 0.5rem 0;
          color: #333;
        }

        .stat-label {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
      }
    }

    .upcoming-events {
      margin-bottom: 2rem;

      h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
      }

      .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }

      .event-card {
        mat-card-content {
          display: flex;
          align-items: center;
          padding: 1rem;
        }

        .event-date {
          background: #1b5e20;
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          text-align: center;
          margin-right: 1rem;
          min-width: 60px;

          .day {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .month {
            display: block;
            font-size: 0.9rem;
          }
        }

        .event-details {
          h3 {
            margin: 0 0 0.5rem;
            color: #333;
          }

          p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
          }
        }
      }
    }

    .quick-actions {
      h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;

        button {
          padding: 1rem;
          
          mat-icon {
            margin-right: 0.5rem;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .events-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {
  studentName = 'Étudiant'; // This would normally come from a user service
} 
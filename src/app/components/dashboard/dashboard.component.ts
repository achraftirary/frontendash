import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    RouterModule
  ],
  template: `
    <div class="dashboard-container fade-in">
      <!-- En-tête du tableau de bord -->
      <div class="dashboard-header">
        <h1 class="section-title">Tableau de bord</h1>
        <p class="welcome-text">Bienvenue, {{ userName }}</p>
      </div>

      <!-- Cartes de statistiques -->
      <div class="stats-grid">
        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-primary-light">
              <mat-icon>school</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Cours en cours</h3>
              <p class="stat-number">6</p>
              <mat-progress-bar mode="determinate" value="60"></mat-progress-bar>
              <p class="stat-detail">4 cours complétés</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-accent-light">
              <mat-icon>assignment</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Devoirs à rendre</h3>
              <p class="stat-number">3</p>
              <mat-progress-bar mode="determinate" value="40" color="accent"></mat-progress-bar>
              <p class="stat-detail">Cette semaine</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-success-light">
              <mat-icon>grade</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Moyenne générale</h3>
              <p class="stat-number">16.5</p>
              <mat-progress-bar mode="determinate" value="82" color="primary"></mat-progress-bar>
              <p class="stat-detail">Semestre en cours</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-warn-light">
              <mat-icon>event</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Événements</h3>
              <p class="stat-number">2</p>
              <mat-progress-bar mode="determinate" value="20" color="warn"></mat-progress-bar>
              <p class="stat-detail">Cette semaine</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Sections principales -->
      <div class="dashboard-sections">
        <div class="section-grid">
          <!-- Activités récentes -->
          <mat-card class="dashboard-card hover-elevation">
            <mat-card-header>
              <mat-card-title>Activités récentes</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="activity-list">
                <div class="activity-item">
                  <div class="activity-icon bg-primary-light">
                    <mat-icon>upload_file</mat-icon>
                  </div>
                  <div class="activity-details">
                    <h4>Devoir soumis</h4>
                    <p>Analyse Numérique - TP2</p>
                    <small>Il y a 2 heures</small>
                  </div>
                </div>
                <mat-divider></mat-divider>
                <div class="activity-item">
                  <div class="activity-icon bg-accent-light">
                    <mat-icon>comment</mat-icon>
                  </div>
                  <div class="activity-details">
                    <h4>Nouveau commentaire</h4>
                    <p>Sur votre devoir de Probabilités</p>
                    <small>Il y a 5 heures</small>
                  </div>
                </div>
                <mat-divider></mat-divider>
                <div class="activity-item">
                  <div class="activity-icon bg-warn-light">
                    <mat-icon>grade</mat-icon>
                  </div>
                  <div class="activity-details">
                    <h4>Note publiée</h4>
                    <p>Statistiques - Examen final</p>
                    <small>Il y a 1 jour</small>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Prochains événements -->
          <mat-card class="dashboard-card hover-elevation">
            <mat-card-header>
              <mat-card-title>Prochains événements</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="events-list">
                <div class="event-item">
                  <div class="event-date">
                    <span class="day">15</span>
                    <span class="month">Mai</span>
                  </div>
                  <div class="event-details">
                    <h4>Examen Machine Learning</h4>
                    <p>Salle: A204 - 14:00</p>
                  </div>
                </div>
                <mat-divider></mat-divider>
                <div class="event-item">
                  <div class="event-date">
                    <span class="day">18</span>
                    <span class="month">Mai</span>
                  </div>
                  <div class="event-details">
                    <h4>Présentation Projet Data Mining</h4>
                    <p>Amphithéâtre - 10:00</p>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <!-- Actions rapides -->
      <div class="quick-actions">
        <mat-card class="action-card hover-elevation">
          <mat-card-content>
            <button mat-raised-button color="primary" routerLink="/courses">
              <mat-icon>school</mat-icon>
              Voir mes cours
            </button>
            <button mat-raised-button color="accent" routerLink="/assignments">
              <mat-icon>assignment</mat-icon>
              Gérer mes devoirs
            </button>
            <button mat-raised-button color="warn" routerLink="/calendar">
              <mat-icon>event</mat-icon>
              Calendrier
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 32px;

      .section-title {
        margin: 0;
        font-size: 2rem;
        color: #2e7d32;
      }

      .welcome-text {
        margin: 8px 0 0;
        font-size: 1.1rem;
        color: #666;
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      .mat-mdc-card-content {
        padding: 24px;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;

        mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
          color: #2e7d32;
        }
      }

      .stat-info {
        h3 {
          margin: 0;
          font-size: 1rem;
          color: #666;
          font-weight: 500;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 600;
          color: #2e7d32;
          margin: 8px 0;
        }

        .stat-detail {
          font-size: 0.9rem;
          color: #666;
          margin: 8px 0 0;
        }

        mat-progress-bar {
          margin: 12px 0;
        }
      }
    }

    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .dashboard-card {
      height: 100%;

      .mat-mdc-card-header {
        padding: 16px;

        .mat-mdc-card-title {
          font-size: 1.25rem;
          color: #2e7d32;
          margin: 0;
        }
      }

      .mat-mdc-card-content {
        padding: 0 16px 16px;
      }
    }

    .activity-list {
      .activity-item {
        display: flex;
        align-items: flex-start;
        padding: 16px 0;

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;

          mat-icon {
            font-size: 20px;
            color: #2e7d32;
          }
        }

        .activity-details {
          flex: 1;

          h4 {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            color: #333;
          }

          p {
            margin: 4px 0;
            font-size: 0.9rem;
            color: #666;
          }

          small {
            font-size: 0.8rem;
            color: #999;
          }
        }
      }
    }

    .events-list {
      .event-item {
        display: flex;
        align-items: center;
        padding: 16px 0;

        .event-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(46, 125, 50, 0.1);
          border-radius: 8px;
          margin-right: 16px;

          .day {
            font-size: 1.5rem;
            font-weight: 600;
            color: #2e7d32;
            line-height: 1;
          }

          .month {
            font-size: 0.8rem;
            color: #666;
            text-transform: uppercase;
          }
        }

        .event-details {
          flex: 1;

          h4 {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            color: #333;
          }

          p {
            margin: 4px 0 0;
            font-size: 0.9rem;
            color: #666;
          }
        }
      }
    }

    .quick-actions {
      .action-card {
        .mat-mdc-card-content {
          display: flex;
          gap: 16px;
          padding: 16px;
          flex-wrap: wrap;

          button {
            flex: 1;
            min-width: 200px;
            padding: 8px 16px;

            mat-icon {
              margin-right: 8px;
            }
          }
        }
      }
    }

    // Utility classes
    .bg-primary-light {
      background-color: rgba(46, 125, 50, 0.1);
    }

    .bg-accent-light {
      background-color: rgba(117, 117, 117, 0.1);
    }

    .bg-warn-light {
      background-color: rgba(244, 67, 54, 0.1);
    }

    .bg-success-light {
      background-color: rgba(76, 175, 80, 0.1);
    }

    mat-divider {
      margin: 0;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .section-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .quick-actions .action-card .mat-mdc-card-content {
        flex-direction: column;
        
        button {
          width: 100%;
        }
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  userName = 'Étudiant';

  constructor() {}

  ngOnInit() {
    // TODO: Get user name from AuthService
  }
} 
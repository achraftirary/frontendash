import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    RouterModule,
    MatTableModule
  ],
  template: `
    <div class="dashboard-container fade-in">
      <div class="dashboard-header">
        <h1 class="section-title">Administration INSEA</h1>
        <p class="welcome-text">Bienvenue, {{ adminName }}</p>
      </div>

      <!-- Statistiques principales -->
      <div class="stats-grid">
        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-primary-light">
              <mat-icon>school</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Étudiants inscrits</h3>
              <p class="stat-number">1,245</p>
              <mat-progress-bar mode="determinate" value="85"></mat-progress-bar>
              <p class="stat-detail">+12% ce semestre</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-accent-light">
              <mat-icon>person</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Professeurs</h3>
              <p class="stat-number">48</p>
              <mat-progress-bar mode="determinate" value="90" color="accent"></mat-progress-bar>
              <p class="stat-detail">Tous les départements</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-warn-light">
              <mat-icon>book</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Cours actifs</h3>
              <p class="stat-number">156</p>
              <mat-progress-bar mode="determinate" value="75" color="warn"></mat-progress-bar>
              <p class="stat-detail">Ce semestre</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-success-light">
              <mat-icon>meeting_room</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Salles</h3>
              <p class="stat-number">32</p>
              <mat-progress-bar mode="determinate" value="95" color="primary"></mat-progress-bar>
              <p class="stat-detail">Taux d'occupation</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Sections principales -->
      <div class="dashboard-sections">
        <div class="section-grid">
          <!-- Activité récente -->
          <mat-card class="dashboard-card hover-elevation">
            <mat-card-header>
              <mat-card-title>Activité récente</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="activity-list">
                <div class="activity-item" *ngFor="let activity of recentActivities; let last = last">
                  <div class="activity-icon" [class]="activity.iconBg">
                    <mat-icon>{{ activity.icon }}</mat-icon>
                  </div>
                  <div class="activity-details">
                    <h4>{{ activity.title }}</h4>
                    <p>{{ activity.description }}</p>
                    <small>{{ activity.time }}</small>
                  </div>
                  <mat-divider *ngIf="!last"></mat-divider>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Statistiques système -->
          <mat-card class="dashboard-card hover-elevation">
            <mat-card-header>
              <mat-card-title>État du système</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="system-stats">
                <div class="stat-item">
                  <div class="stat-label">
                    <span>Utilisation CPU</span>
                    <span class="stat-value">28%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="28" color="primary"></mat-progress-bar>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <span>Mémoire</span>
                    <span class="stat-value">45%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="45" color="accent"></mat-progress-bar>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <span>Stockage</span>
                    <span class="stat-value">72%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="72" color="warn"></mat-progress-bar>
                </div>

                <div class="stat-item">
                  <div class="stat-label">
                    <span>Bande passante</span>
                    <span class="stat-value">35%</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="35" color="primary"></mat-progress-bar>
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
            <button mat-raised-button color="primary" routerLink="/admin/users">
              <mat-icon>person_add</mat-icon>
              Gérer les utilisateurs
            </button>
            <button mat-raised-button color="accent" routerLink="/admin/courses">
              <mat-icon>library_add</mat-icon>
              Gérer les cours
            </button>
            <button mat-raised-button color="warn" routerLink="/admin/departments">
              <mat-icon>account_tree</mat-icon>
              Départements
            </button>
            <button mat-raised-button color="primary" routerLink="/admin/settings">
              <mat-icon>settings</mat-icon>
              Paramètres système
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
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        &:last-child {
          border-bottom: none;
        }

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

          &.bg-primary-light {
            background-color: rgba(46, 125, 50, 0.1);
          }

          &.bg-accent-light {
            background-color: rgba(117, 117, 117, 0.1);
          }

          &.bg-warn-light {
            background-color: rgba(244, 67, 54, 0.1);
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

    .system-stats {
      padding: 16px 0;

      .stat-item {
        margin-bottom: 24px;

        &:last-child {
          margin-bottom: 0;
        }

        .stat-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: #666;

          .stat-value {
            font-weight: 500;
            color: #2e7d32;
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
export class AdminDashboardComponent implements OnInit {
  adminName = 'Admin';

  recentActivities = [
    {
      icon: 'person_add',
      iconBg: 'bg-primary-light',
      title: 'Nouvel utilisateur',
      description: 'Compte professeur créé pour Dr. Hassan',
      time: 'Il y a 10 minutes'
    },
    {
      icon: 'school',
      iconBg: 'bg-accent-light',
      title: 'Nouveau cours',
      description: 'Machine Learning ajouté au programme',
      time: 'Il y a 1 heure'
    },
    {
      icon: 'warning',
      iconBg: 'bg-warn-light',
      title: 'Alerte système',
      description: 'Mise à jour de sécurité disponible',
      time: 'Il y a 2 heures'
    },
    {
      icon: 'event',
      iconBg: 'bg-primary-light',
      title: 'Événement planifié',
      description: 'Maintenance système prévue',
      time: 'Il y a 3 heures'
    }
  ];

  constructor() {}

  ngOnInit() {
    // TODO: Get admin data from AuthService
  }
} 
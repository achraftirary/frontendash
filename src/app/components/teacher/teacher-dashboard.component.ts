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
  selector: 'app-teacher-dashboard',
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
        <h1 class="section-title">Tableau de bord Professeur</h1>
        <p class="welcome-text">Bienvenue, Prof. {{ teacherName }}</p>
      </div>

      <!-- Statistiques principales -->
      <div class="stats-grid">
        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-primary-light">
              <mat-icon>groups</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Étudiants actifs</h3>
              <p class="stat-number">124</p>
              <mat-progress-bar mode="determinate" value="80"></mat-progress-bar>
              <p class="stat-detail">4 classes</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-accent-light">
              <mat-icon>school</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Cours actifs</h3>
              <p class="stat-number">6</p>
              <mat-progress-bar mode="determinate" value="60" color="accent"></mat-progress-bar>
              <p class="stat-detail">Ce semestre</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-warn-light">
              <mat-icon>assignment</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Devoirs à corriger</h3>
              <p class="stat-number">15</p>
              <mat-progress-bar mode="determinate" value="30" color="warn"></mat-progress-bar>
              <p class="stat-detail">Cette semaine</p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card hover-elevation">
          <mat-card-content>
            <div class="stat-icon bg-success-light">
              <mat-icon>event</mat-icon>
            </div>
            <div class="stat-info">
              <h3>Prochains cours</h3>
              <p class="stat-number">4</p>
              <mat-progress-bar mode="determinate" value="40" color="primary"></mat-progress-bar>
              <p class="stat-detail">Aujourd'hui</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Sections principales -->
      <div class="dashboard-sections">
        <div class="section-grid">
          <!-- Derniers devoirs soumis -->
          <mat-card class="dashboard-card hover-elevation">
            <mat-card-header>
              <mat-card-title>Derniers devoirs soumis</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="recentSubmissions" class="submission-table">
                <ng-container matColumnDef="student">
                  <th mat-header-cell *matHeaderCellDef>Étudiant</th>
                  <td mat-cell *matCellDef="let submission">{{ submission.student }}</td>
                </ng-container>

                <ng-container matColumnDef="assignment">
                  <th mat-header-cell *matHeaderCellDef>Devoir</th>
                  <td mat-cell *matCellDef="let submission">{{ submission.assignment }}</td>
                </ng-container>

                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef>Date</th>
                  <td mat-cell *matCellDef="let submission">{{ submission.date }}</td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Statut</th>
                  <td mat-cell *matCellDef="let submission">
                    <div class="chip-list">
                      <span class="chip" [class.warn]="submission.status === 'En attente'" [class.primary]="submission.status !== 'En attente'">
                        {{ submission.status }}
                      </span>
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="['student', 'assignment', 'date', 'status']"></tr>
                <tr mat-row *matRowDef="let row; columns: ['student', 'assignment', 'date', 'status'];"></tr>
              </table>
            </mat-card-content>
          </mat-card>

          <!-- Emploi du temps -->
          <mat-card class="dashboard-card hover-elevation">
            <mat-card-header>
              <mat-card-title>Emploi du temps d'aujourd'hui</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="schedule-list">
                <div class="schedule-item" *ngFor="let class of todayClasses">
                  <div class="time-slot">
                    <span class="time">{{ class.time }}</span>
                  </div>
                  <div class="class-details">
                    <h4>{{ class.subject }}</h4>
                    <p>{{ class.location }} - {{ class.group }}</p>
                    <div class="chip-list">
                      <span class="chip primary">{{ class.duration }}</span>
                    </div>
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
            <button mat-raised-button color="primary" routerLink="/teacher/courses">
              <mat-icon>add</mat-icon>
              Créer un cours
            </button>
            <button mat-raised-button color="accent" routerLink="/teacher/assignments">
              <mat-icon>assignment</mat-icon>
              Gérer les devoirs
            </button>
            <button mat-raised-button color="warn" routerLink="/teacher/grades">
              <mat-icon>grade</mat-icon>
              Saisir les notes
            </button>
            <button mat-raised-button color="primary" routerLink="/teacher/students">
              <mat-icon>people</mat-icon>
              Liste des étudiants
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

         .submission-table {
       width: 100%;

       .mat-mdc-header-cell {
         font-weight: 600;
         color: #2e7d32;
       }

       .mat-mdc-row {
         &:hover {
           background-color: rgba(46, 125, 50, 0.05);
         }
       }

       .mat-mdc-cell {
         color: #333;
       }

       .chip-list {
         .chip {
           padding: 4px 12px;
           border-radius: 16px;
           font-size: 0.85rem;
           font-weight: 500;

           &.primary {
             background-color: rgba(46, 125, 50, 0.1);
             color: #2e7d32;
           }

           &.warn {
             background-color: rgba(244, 67, 54, 0.1);
             color: #f44336;
           }
         }
       }
    }

    .schedule-list {
      .schedule-item {
        display: flex;
        align-items: flex-start;
        padding: 16px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        &:last-child {
          border-bottom: none;
        }

        .time-slot {
          min-width: 100px;
          text-align: center;
          padding: 8px;
          background: rgba(46, 125, 50, 0.1);
          border-radius: 8px;
          margin-right: 16px;

          .time {
            font-size: 1rem;
            font-weight: 500;
            color: #2e7d32;
          }
        }

        .class-details {
          flex: 1;

          h4 {
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            color: #333;
          }

          p {
            margin: 4px 0 8px;
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

      .submission-table {
        .mat-mdc-header-cell,
        .mat-mdc-cell {
          padding: 8px;
          font-size: 0.9rem;
        }
      }
    }
  `]
})
export class TeacherDashboardComponent implements OnInit {
  teacherName = 'Mohammed';
  
  recentSubmissions = [
    { student: 'Ahmed Alami', assignment: 'TP2 Analyse Numérique', date: '15/05/2024', status: 'En attente' },
    { student: 'Sara Bennani', assignment: 'Projet Data Mining', date: '14/05/2024', status: 'En attente' },
    { student: 'Karim Idrissi', assignment: 'Examen Machine Learning', date: '13/05/2024', status: 'Corrigé' },
    { student: 'Fatima Zahra', assignment: 'TP1 Statistiques', date: '12/05/2024', status: 'Corrigé' }
  ];

  todayClasses = [
    { time: '08:30', subject: 'Analyse Numérique', location: 'Salle A204', group: 'Groupe A', duration: '1h30' },
    { time: '10:15', subject: 'Machine Learning', location: 'Lab Info 2', group: 'Groupe B', duration: '2h00' },
    { time: '14:00', subject: 'Statistiques', location: 'Amphi 3', group: 'Tous les groupes', duration: '1h30' },
    { time: '15:45', subject: 'Data Mining', location: 'Salle B103', group: 'Groupe C', duration: '2h00' }
  ];

  constructor() {}

  ngOnInit() {
    // TODO: Get teacher data from AuthService
  }
} 
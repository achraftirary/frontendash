import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

interface Assignment {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  professor: string;
  category: string;
  remainingDays: number;
}

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatTabsModule
  ],
  template: `
    <div class="assignments-container fade-in">
      <!-- En-tête -->
      <header class="assignments-header">
        <div class="header-content">
          <h1 class="section-title">Devoirs</h1>
          <p class="subtitle">Gérez vos devoirs et suivez vos soumissions</p>
        </div>
      </header>

      <!-- Onglets -->
      <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" class="custom-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon matBadge="2" matBadgeColor="warn">assignment</mat-icon>
            <span class="tab-label">À faire</span>
          </ng-template>
          
          <div class="assignments-grid">
            <mat-card *ngFor="let assignment of pendingAssignments" class="assignment-card card-hover">
              <mat-card-content>
                <div class="assignment-header">
                  <div class="category-badge" [ngClass]="assignment.category.toLowerCase()">
                    {{assignment.category}}
                  </div>
                  <div class="due-date" [ngClass]="{'urgent': assignment.remainingDays <= 3}">
                    <mat-icon>event</mat-icon>
                    <span>{{assignment.dueDate}}</span>
                  </div>
                </div>

                <h2 class="assignment-title">{{assignment.title}}</h2>
                <p class="assignment-course">{{assignment.course}}</p>
                <p class="assignment-description">{{assignment.description}}</p>

                <div class="assignment-meta">
                  <div class="meta-item">
                    <mat-icon>person</mat-icon>
                    <span>{{assignment.professor}}</span>
                  </div>
                  <div class="meta-item" [ngClass]="{'urgent': assignment.remainingDays <= 3}">
                    <mat-icon>timer</mat-icon>
                    <span>{{assignment.remainingDays}} jours restants</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-raised-button color="primary" [routerLink]="['/assignments', assignment.id]">
                  <mat-icon>upload_file</mat-icon>
                  Soumettre
                </button>
                <button mat-stroked-button color="primary" matTooltip="Voir les détails">
                  <mat-icon>info</mat-icon>
                  Détails
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>done_all</mat-icon>
            <span class="tab-label">Soumis</span>
          </ng-template>
          
          <div class="assignments-grid">
            <mat-card *ngFor="let assignment of submittedAssignments" class="assignment-card card-hover">
              <mat-card-content>
                <div class="assignment-header">
                  <div class="category-badge" [ngClass]="assignment.category.toLowerCase()">
                    {{assignment.category}}
                  </div>
                  <div class="status-badge" [ngClass]="assignment.status">
                    {{assignment.status === 'submitted' ? 'Soumis' : 'Noté'}}
                    <span *ngIf="assignment.grade">({{assignment.grade}}/20)</span>
                  </div>
                </div>

                <h2 class="assignment-title">{{assignment.title}}</h2>
                <p class="assignment-course">{{assignment.course}}</p>
                <p class="assignment-description">{{assignment.description}}</p>

                <div class="assignment-meta">
                  <div class="meta-item">
                    <mat-icon>person</mat-icon>
                    <span>{{assignment.professor}}</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>calendar_today</mat-icon>
                    <span>Soumis le {{assignment.dueDate}}</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-stroked-button color="primary">
                  <mat-icon>download</mat-icon>
                  Télécharger
                </button>
                <button mat-stroked-button color="primary">
                  <mat-icon>feedback</mat-icon>
                  Feedback
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .assignments-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .assignments-header {
      margin-bottom: 2rem;
      
      .subtitle {
        color: var(--text-secondary);
        font-size: 1.1rem;
        margin: 0.5rem 0 0;
      }
    }

    .custom-tabs {
      margin-bottom: 2rem;

      ::ng-deep {
        .mat-mdc-tab {
          min-width: 160px;
          
          .mat-icon {
            margin-right: 8px;
          }
        }

        .tab-label {
          margin-left: 8px;
        }
      }
    }

    .assignments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .assignment-card {
      display: flex;
      flex-direction: column;
      height: 100%;

      .assignment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .category-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;

        &.mathematics {
          background: #e3f2fd;
          color: #1565c0;
        }

        &.computer-science {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        &.statistics {
          background: #e8f5e9;
          color: #2e7d32;
        }
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;

        &.submitted {
          background: #fff3e0;
          color: #f57c00;
        }

        &.graded {
          background: #e8f5e9;
          color: #2e7d32;
        }
      }

      .due-date {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--text-secondary);
        font-size: 0.9rem;

        &.urgent {
          color: #f44336;
        }

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      .assignment-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--text-primary);
        margin: 0 0 0.5rem;
      }

      .assignment-course {
        color: var(--primary-color);
        font-weight: 500;
        margin: 0 0 0.5rem;
      }

      .assignment-description {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .assignment-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
          font-size: 0.9rem;

          &.urgent {
            color: #f44336;
          }

          mat-icon {
            font-size: 18px;
            width: 18px;
            height: 18px;
          }
        }
      }

      mat-card-actions {
        padding: 1rem;
        display: flex;
        gap: 0.5rem;
        margin-top: auto;

        button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
      }
    }

    @media (max-width: 768px) {
      .assignments-container {
        padding: 1rem;
      }

      .assignments-grid {
        grid-template-columns: 1fr;
      }

      .custom-tabs {
        ::ng-deep {
          .mat-mdc-tab {
            min-width: auto;
          }
        }
      }
    }
  `]
})
export class AssignmentsComponent {
  pendingAssignments: Assignment[] = [
    {
      id: 1,
      title: 'Devoir de Mathématiques',
      course: 'Advanced Mathematics II',
      description: 'Chapitre 5 - Calcul Différentiel',
      dueDate: '20 Mai 2024',
      status: 'pending',
      professor: 'Prof. Mohammed Hassan',
      category: 'Mathematics',
      remainingDays: 4
    },
    {
      id: 2,
      title: 'Projet de Structures de Données',
      course: 'Data Structures and Algorithms',
      description: 'Implémentation d\'un arbre binaire',
      dueDate: '25 Mai 2024',
      status: 'pending',
      professor: 'Prof. Sarah Ahmed',
      category: 'Computer Science',
      remainingDays: 9
    }
  ];

  submittedAssignments: Assignment[] = [
    {
      id: 3,
      title: 'Analyse de données',
      course: 'Statistical Analysis',
      description: 'Analyse statistique d\'un jeu de données réel',
      dueDate: '15 Mai 2024',
      status: 'graded',
      grade: 18,
      professor: 'Dr. Karim Benali',
      category: 'Statistics',
      remainingDays: 0
    }
  ];
} 
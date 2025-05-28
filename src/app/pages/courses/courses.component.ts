import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

interface Course {
  id: number;
  title: string;
  professor: string;
  department: string;
  progress: number;
  nextClass: string;
  room: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule,
    RouterModule
  ],
  template: `
    <div class="courses-container">
      <header class="courses-header">
        <h1>Mes Cours</h1>
        <p class="subtitle">Accédez à vos cours et ressources pédagogiques</p>
      </header>

      <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" class="custom-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>school</mat-icon>
            <span class="tab-label">Cours en cours</span>
          </ng-template>
          
          <div class="courses-grid">
            <mat-card *ngFor="let course of currentCourses" class="course-card">
              <img [src]="course.image" [alt]="course.title" class="course-image">
              
              <mat-card-content>
                <div class="course-header">
                  <div class="department-badge" [ngClass]="course.department.toLowerCase()">
                    {{course.department}}
                  </div>
                  <div class="progress-info">
                    <span>{{course.progress}}% complété</span>
                    <mat-progress-bar mode="determinate" [value]="course.progress"></mat-progress-bar>
                  </div>
                </div>

                <h2 class="course-title">{{course.title}}</h2>
                <p class="course-professor">Prof. {{course.professor}}</p>
                <p class="course-description">{{course.description}}</p>

                <div class="next-class-info">
                  <div class="info-item">
                    <mat-icon>event</mat-icon>
                    <span>Prochain cours: {{course.nextClass}}</span>
                  </div>
                  <div class="info-item">
                    <mat-icon>room</mat-icon>
                    <span>Salle: {{course.room}}</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-raised-button color="primary" [routerLink]="['/courses', course.id]">
                  <mat-icon>play_circle</mat-icon>
                  Continuer
                </button>
                <button mat-stroked-button color="primary">
                  <mat-icon>info</mat-icon>
                  Détails
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>history</mat-icon>
            <span class="tab-label">Cours terminés</span>
          </ng-template>
          
          <div class="courses-grid">
            <mat-card *ngFor="let course of completedCourses" class="course-card completed">
              <img [src]="course.image" [alt]="course.title" class="course-image">
              
              <mat-card-content>
                <div class="course-header">
                  <div class="department-badge" [ngClass]="course.department.toLowerCase()">
                    {{course.department}}
                  </div>
                  <div class="completion-badge">
                    <mat-icon>check_circle</mat-icon>
                    Terminé
                  </div>
                </div>

                <h2 class="course-title">{{course.title}}</h2>
                <p class="course-professor">Prof. {{course.professor}}</p>
                <p class="course-description">{{course.description}}</p>
              </mat-card-content>

              <mat-card-actions>
                <button mat-stroked-button color="primary">
                  <mat-icon>grade</mat-icon>
                  Voir la note
                </button>
                <button mat-stroked-button color="primary">
                  <mat-icon>history</mat-icon>
                  Historique
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .courses-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .courses-header {
      margin-bottom: 2rem;
      
      h1 {
        margin: 0;
        font-size: 2rem;
        font-weight: 500;
        color: #1b5e20;
      }

      .subtitle {
        color: #666;
        font-size: 1.1rem;
        margin: 0.5rem 0 0;
      }
    }

    .custom-tabs {
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

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .course-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;

      &.completed {
        opacity: 0.8;
      }

      .course-image {
        height: 200px;
        object-fit: cover;
      }

      .course-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .department-badge {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;

        &.statistique {
          background: #e3f2fd;
          color: #1565c0;
        }

        &.data_science {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        &.actuariat {
          background: #e8f5e9;
          color: #2e7d32;
        }

        &.recherche_operationnelle {
          background: #fff3e0;
          color: #f57c00;
        }
      }

      .progress-info {
        text-align: right;
        
        span {
          display: block;
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 4px;
        }

        mat-progress-bar {
          width: 100px;
        }
      }

      .completion-badge {
        display: flex;
        align-items: center;
        color: #2e7d32;
        font-size: 0.9rem;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }
      }

      .course-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: #333;
        margin: 0 0 0.5rem;
      }

      .course-professor {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }

      .course-description {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .next-class-info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.9rem;

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
      .courses-container {
        padding: 1rem;
      }

      .courses-grid {
        grid-template-columns: 1fr;
      }

      .course-card {
        .course-image {
          height: 150px;
        }
      }
    }
  `]
})
export class CoursesComponent {
  currentCourses: Course[] = [
    {
      id: 1,
      title: 'Statistiques Avancées',
      professor: 'Mohammed Hassan',
      department: 'STATISTIQUE',
      progress: 65,
      nextClass: 'Lundi 18 Mai, 09:00',
      room: 'A204',
      image: 'assets/images/courses/statistics.jpg',
      description: 'Cours avancé sur les méthodes statistiques et leur application dans l\'analyse de données.'
    },
    {
      id: 2,
      title: 'Machine Learning',
      professor: 'Sarah Ahmed',
      department: 'DATA_SCIENCE',
      progress: 45,
      nextClass: 'Mardi 19 Mai, 14:00',
      room: 'B102',
      image: 'assets/images/courses/machine-learning.jpg',
      description: 'Introduction aux concepts fondamentaux du machine learning et ses applications.'
    },
    {
      id: 3,
      title: 'Modélisation Actuarielle',
      professor: 'Karim Bensouda',
      department: 'ACTUARIAT',
      progress: 80,
      nextClass: 'Mercredi 20 Mai, 10:30',
      room: 'C305',
      image: 'assets/images/courses/actuarial.jpg',
      description: 'Étude des modèles actuariels et leur application dans l\'assurance.'
    }
  ];

  completedCourses: Course[] = [
    {
      id: 4,
      title: 'Optimisation Linéaire',
      professor: 'Hassan Alami',
      department: 'RECHERCHE_OPERATIONNELLE',
      progress: 100,
      nextClass: '',
      room: '',
      image: 'assets/images/courses/optimization.jpg',
      description: 'Introduction à la programmation linéaire et aux méthodes d\'optimisation.'
    }
  ];
} 
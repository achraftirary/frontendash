import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

interface Resource {
  id: number;
  title: string;
  type: 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';
  course: string;
  professor: string;
  uploadDate: string;
  size?: string;
  duration?: string;
  description: string;
  downloads: number;
  views: number;
}

@Component({
  selector: 'app-resources',
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
    <div class="resources-container">
      <header class="resources-header">
        <h1>Ressources pédagogiques</h1>
        <p class="subtitle">Accédez à tous vos supports de cours</p>
      </header>

      <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" class="custom-tabs">
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>description</mat-icon>
            <span class="tab-label">Documents</span>
          </ng-template>
          
          <div class="resources-grid">
            <mat-card *ngFor="let resource of documentResources" class="resource-card">
              <mat-card-content>
                <div class="resource-header">
                  <div class="type-badge" [ngClass]="resource.type.toLowerCase()">
                    <mat-icon>{{getTypeIcon(resource.type)}}</mat-icon>
                    {{resource.type}}
                  </div>
                  <div class="meta-info">
                    <span class="date">{{resource.uploadDate}}</span>
                    <span class="size" *ngIf="resource.size">{{resource.size}}</span>
                    <span class="duration" *ngIf="resource.duration">{{resource.duration}}</span>
                  </div>
                </div>

                <h2 class="resource-title">{{resource.title}}</h2>
                <p class="resource-course">{{resource.course}}</p>
                <p class="resource-professor">Prof. {{resource.professor}}</p>
                <p class="resource-description">{{resource.description}}</p>

                <div class="resource-stats">
                  <div class="stat">
                    <mat-icon>download</mat-icon>
                    <span>{{resource.downloads}} téléchargements</span>
                  </div>
                  <div class="stat">
                    <mat-icon>visibility</mat-icon>
                    <span>{{resource.views}} vues</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-raised-button color="primary">
                  <mat-icon>download</mat-icon>
                  Télécharger
                </button>
                <button mat-stroked-button color="primary">
                  <mat-icon>visibility</mat-icon>
                  Aperçu
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon>play_circle</mat-icon>
            <span class="tab-label">Vidéos</span>
          </ng-template>
          
          <div class="resources-grid">
            <mat-card *ngFor="let resource of videoResources" class="resource-card">
              <div class="video-thumbnail">
                <mat-icon>play_circle</mat-icon>
              </div>
              
              <mat-card-content>
                <div class="resource-header">
                  <div class="type-badge video">
                    <mat-icon>videocam</mat-icon>
                    VIDEO
                  </div>
                  <div class="meta-info">
                    <span class="date">{{resource.uploadDate}}</span>
                    <span class="duration">{{resource.duration}}</span>
                  </div>
                </div>

                <h2 class="resource-title">{{resource.title}}</h2>
                <p class="resource-course">{{resource.course}}</p>
                <p class="resource-professor">Prof. {{resource.professor}}</p>
                <p class="resource-description">{{resource.description}}</p>

                <div class="resource-stats">
                  <div class="stat">
                    <mat-icon>visibility</mat-icon>
                    <span>{{resource.views}} vues</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-raised-button color="primary">
                  <mat-icon>play_arrow</mat-icon>
                  Regarder
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
            <mat-icon>link</mat-icon>
            <span class="tab-label">Liens utiles</span>
          </ng-template>
          
          <div class="resources-grid">
            <mat-card *ngFor="let resource of linkResources" class="resource-card">
              <mat-card-content>
                <div class="resource-header">
                  <div class="type-badge link">
                    <mat-icon>link</mat-icon>
                    LINK
                  </div>
                  <div class="meta-info">
                    <span class="date">{{resource.uploadDate}}</span>
                  </div>
                </div>

                <h2 class="resource-title">{{resource.title}}</h2>
                <p class="resource-course">{{resource.course}}</p>
                <p class="resource-professor">Prof. {{resource.professor}}</p>
                <p class="resource-description">{{resource.description}}</p>

                <div class="resource-stats">
                  <div class="stat">
                    <mat-icon>visibility</mat-icon>
                    <span>{{resource.views}} vues</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-raised-button color="primary">
                  <mat-icon>open_in_new</mat-icon>
                  Ouvrir
                </button>
                <button mat-stroked-button color="primary">
                  <mat-icon>content_copy</mat-icon>
                  Copier
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .resources-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .resources-header {
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

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .resource-card {
      display: flex;
      flex-direction: column;
      height: 100%;

      .video-thumbnail {
        height: 200px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        
        mat-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          color: #666;
        }
      }

      .resource-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .type-badge {
        display: flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }

        &.pdf {
          background: #fbe9e7;
          color: #d84315;
        }

        &.video {
          background: #e3f2fd;
          color: #1565c0;
        }

        &.link {
          background: #f3e5f5;
          color: #7b1fa2;
        }

        &.document {
          background: #e8f5e9;
          color: #2e7d32;
        }
      }

      .meta-info {
        display: flex;
        gap: 1rem;
        color: #666;
        font-size: 0.8rem;
      }

      .resource-title {
        font-size: 1.25rem;
        font-weight: 500;
        color: #333;
        margin: 0 0 0.5rem;
      }

      .resource-course {
        color: var(--primary-color);
        font-weight: 500;
        margin: 0 0 0.5rem;
      }

      .resource-professor {
        color: #666;
        font-size: 0.9rem;
        margin: 0 0 0.5rem;
      }

      .resource-description {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .resource-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
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
      .resources-container {
        padding: 1rem;
      }

      .resources-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ResourcesComponent {
  documentResources: Resource[] = [
    {
      id: 1,
      title: 'Introduction aux Statistiques',
      type: 'PDF',
      course: 'Statistiques Avancées',
      professor: 'Mohammed Hassan',
      uploadDate: '15 Mai 2024',
      size: '2.5 MB',
      description: 'Support de cours couvrant les concepts fondamentaux des statistiques.',
      downloads: 125,
      views: 450
    },
    {
      id: 2,
      title: 'Exercices Machine Learning',
      type: 'DOCUMENT',
      course: 'Machine Learning',
      professor: 'Sarah Ahmed',
      uploadDate: '14 Mai 2024',
      size: '1.8 MB',
      description: 'Série d\'exercices sur les algorithmes de classification.',
      downloads: 89,
      views: 320
    }
  ];

  videoResources: Resource[] = [
    {
      id: 3,
      title: 'Régression Linéaire',
      type: 'VIDEO',
      course: 'Statistiques Avancées',
      professor: 'Mohammed Hassan',
      uploadDate: '13 Mai 2024',
      duration: '45:30',
      description: 'Vidéo explicative sur la régression linéaire et ses applications.',
      downloads: 0,
      views: 280
    }
  ];

  linkResources: Resource[] = [
    {
      id: 4,
      title: 'Documentation Python',
      type: 'LINK',
      course: 'Machine Learning',
      professor: 'Sarah Ahmed',
      uploadDate: '12 Mai 2024',
      description: 'Lien vers la documentation officielle de Python pour le machine learning.',
      downloads: 0,
      views: 150
    }
  ];

  getTypeIcon(type: string): string {
    switch (type) {
      case 'PDF':
        return 'picture_as_pdf';
      case 'VIDEO':
        return 'videocam';
      case 'LINK':
        return 'link';
      case 'DOCUMENT':
        return 'description';
      default:
        return 'attachment';
    }
  }
} 
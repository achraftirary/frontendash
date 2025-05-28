import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ResourceService, Resource } from '../../../services/resource.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="resource-detail-container" *ngIf="resource">
      <button mat-button color="primary" routerLink="/resources">
        <mat-icon>arrow_back</mat-icon>
        Retour aux ressources
      </button>

      <mat-card class="resource-card">
        <mat-card-header>
          <mat-icon [ngClass]="getTypeClass(resource)" matCardAvatar>
            {{ getTypeIcon(resource) }}
          </mat-icon>
          <mat-card-title>{{ resource.title }}</mat-card-title>
          <mat-card-subtitle>{{ resource.subject }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="type-section">
            <div class="type-chip" [ngClass]="getTypeClass(resource)">
              {{ getTypeLabel(resource) }}
            </div>
            <div class="upload-date">
              Ajouté le {{ resource.uploadDate | date:'fullDate' }}
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="description-section">
            <h3>Description</h3>
            <p>{{ resource.description }}</p>
          </div>

          <mat-divider></mat-divider>

          <div class="details-section">
            <h3>Détails</h3>
            <div class="details-grid">
              <div class="detail-item" *ngIf="resource.size">
                <mat-icon>storage</mat-icon>
                <span>Taille: {{ resource.size }}</span>
              </div>
              <div class="detail-item" *ngIf="resource.duration">
                <mat-icon>timer</mat-icon>
                <span>Durée: {{ resource.duration }}</span>
              </div>
              <div class="detail-item">
                <mat-icon>folder</mat-icon>
                <span>Matière: {{ resource.subject }}</span>
              </div>
            </div>
          </div>

          <div class="preview-section" *ngIf="resource.type === 'video'">
            <h3>Aperçu</h3>
            <div class="video-container">
              <iframe
                [src]="getVideoEmbedUrl(resource.url)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <a mat-raised-button
             color="primary"
             [href]="resource.url"
             target="_blank"
             (click)="onResourceAccess()">
            {{ getActionLabel(resource) }}
          </a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .resource-detail-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .resource-card {
      margin-top: 24px;
    }

    .type-section {
      margin: 16px 0;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .type-chip {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
    }

    .type-chip.document {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .type-chip.video {
      background-color: #fce4ec;
      color: #c2185b;
    }

    .type-chip.link {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }

    .upload-date {
      font-size: 14px;
      color: #666;
    }

    mat-divider {
      margin: 24px 0;
    }

    h3 {
      color: #333;
      font-size: 18px;
      margin-bottom: 16px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
    }

    .detail-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      height: 0;
      overflow: hidden;
      margin-top: 16px;
    }

    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    mat-icon.document { color: #1976d2; }
    mat-icon.video { color: #c2185b; }
    mat-icon.link { color: #7b1fa2; }

    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ResourceDetailComponent implements OnInit, OnDestroy {
  resource: Resource | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.resourceService.getResource(id).subscribe(
          resource => this.resource = resource,
          error => {
            this.snackBar.open('Erreur lors du chargement de la ressource', 'Fermer', {
              duration: 3000
            });
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTypeClass(resource: Resource): string {
    return resource.type;
  }

  getTypeIcon(resource: Resource): string {
    switch (resource.type) {
      case 'document':
        return 'description';
      case 'video':
        return 'play_circle_outline';
      case 'link':
        return 'link';
      default:
        return 'attachment';
    }
  }

  getTypeLabel(resource: Resource): string {
    switch (resource.type) {
      case 'document':
        return 'Document';
      case 'video':
        return 'Vidéo';
      case 'link':
        return 'Lien';
      default:
        return '';
    }
  }

  getActionLabel(resource: Resource): string {
    switch (resource.type) {
      case 'document':
        return 'Télécharger';
      case 'video':
        return 'Regarder';
      case 'link':
        return 'Accéder';
      default:
        return 'Ouvrir';
    }
  }

  getVideoEmbedUrl(url: string): string {
    // Convert YouTube URL to embed URL
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }

  onResourceAccess(): void {
    if (!this.resource) return;

    this.snackBar.open(
      `Accès à la ressource: ${this.resource.title}`,
      'Fermer',
      { duration: 2000 }
    );
  }
} 
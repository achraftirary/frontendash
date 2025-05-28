import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { ResourceService, Resource } from '../../../services/resource.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resources-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule
  ],
  template: `
    <div class="resources-container">
      <h1>Ressources pédagogiques</h1>

      <mat-tab-group>
        <mat-tab label="Tous">
          <div class="resources-grid">
            <mat-card *ngFor="let resource of resources" class="resource-card">
              <mat-card-header>
                <mat-icon [ngClass]="getTypeClass(resource)" matCardAvatar>
                  {{ getTypeIcon(resource) }}
                </mat-icon>
                <mat-card-title>{{ resource.title }}</mat-card-title>
                <mat-card-subtitle>{{ resource.subject }}</mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <p>{{ resource.description }}</p>
                
                <div class="type-chip" [ngClass]="getTypeClass(resource)">
                  {{ getTypeLabel(resource) }}
                </div>

                <div class="resource-meta">
                  <span class="upload-date">
                    Ajouté le {{ resource.uploadDate | date:'shortDate' }}
                  </span>
                  <span class="size" *ngIf="resource.size">
                    {{ resource.size }}
                  </span>
                  <span class="duration" *ngIf="resource.duration">
                    {{ resource.duration }}
                  </span>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <a mat-button color="primary" [href]="resource.url" target="_blank">
                  {{ getActionLabel(resource) }}
                </a>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Documents">
          <div class="resources-grid">
            <mat-card *ngFor="let resource of getResourcesByType('document')" class="resource-card">
              <!-- Same card content as above -->
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Vidéos">
          <div class="resources-grid">
            <mat-card *ngFor="let resource of getResourcesByType('video')" class="resource-card">
              <!-- Same card content as above -->
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Liens">
          <div class="resources-grid">
            <mat-card *ngFor="let resource of getResourcesByType('link')" class="resource-card">
              <!-- Same card content as above -->
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .resources-container {
      padding: 24px;
    }

    h1 {
      margin-bottom: 24px;
      color: #333;
    }

    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      padding: 24px 0;
    }

    .resource-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
      position: relative;
      padding-bottom: 48px;
    }

    .type-chip {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
      margin: 8px 0;
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

    .resource-meta {
      display: flex;
      gap: 16px;
      font-size: 14px;
      color: #666;
      margin-top: 8px;
    }

    mat-icon.document { color: #1976d2; }
    mat-icon.video { color: #c2185b; }
    mat-icon.link { color: #7b1fa2; }

    mat-card-actions {
      padding: 16px;
      margin: 0;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ResourcesListComponent implements OnInit, OnDestroy {
  resources: Resource[] = [];
  private subscription: Subscription | null = null;

  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.subscription = this.resourceService.getResources()
      .subscribe(resources => {
        this.resources = resources.sort((a, b) => 
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        );
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

  getResourcesByType(type: Resource['type']): Resource[] {
    return this.resources.filter(r => r.type === type);
  }
} 
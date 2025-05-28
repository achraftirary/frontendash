import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AbsenceService, Absence } from '../../../services/absence.service';
import { Subscription, forkJoin } from 'rxjs';

interface AbsenceStats {
  total: number;
  justified: number;
  pending: number;
  approved: number;
  rejected: number;
  justifiedPercentage: number;
}

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="attendance-container">
      <h1>Gestion des absences</h1>

      <div class="stats-section">
        <mat-card class="stats-card">
          <mat-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">{{ stats.total }}</div>
                <div class="stat-label">Total des absences</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ stats.justified }}</div>
                <div class="stat-label">Absences justifiées</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ stats.pending }}</div>
                <div class="stat-label">En attente</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ stats.justifiedPercentage }}%</div>
                <div class="stat-label">Taux de justification</div>
                <mat-progress-bar
                  mode="determinate"
                  [value]="stats.justifiedPercentage"
                  [class.warning]="stats.justifiedPercentage < 70"
                  [class.danger]="stats.justifiedPercentage < 50">
                </mat-progress-bar>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group>
        <mat-tab label="Toutes les absences">
          <div class="absences-grid">
            <mat-card *ngFor="let absence of absences" class="absence-card">
              <mat-card-header>
                <mat-icon [ngClass]="getStatusClass(absence)" matCardAvatar>
                  {{ getStatusIcon(absence) }}
                </mat-icon>
                <mat-card-title>{{ absence.subject }}</mat-card-title>
                <mat-card-subtitle>
                  {{ absence.date | date:'fullDate' }}
                </mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <div class="status-chip" [ngClass]="getStatusClass(absence)">
                  {{ getStatusLabel(absence) }}
                </div>

                <div class="absence-details">
                  <div class="detail-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{ absence.duration }}h</span>
                  </div>
                  
                  <div class="detail-item" *ngIf="absence.justified">
                    <mat-icon>description</mat-icon>
                    <span>{{ absence.justification }}</span>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions>
                <button mat-button
                        color="primary"
                        [routerLink]="['/attendance', absence.id]">
                  {{ getActionLabel(absence) }}
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="En attente">
          <div class="absences-grid">
            <mat-card *ngFor="let absence of getAbsencesByStatus('pending')" class="absence-card">
              <!-- Same card content as above -->
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Approuvées">
          <div class="absences-grid">
            <mat-card *ngFor="let absence of getAbsencesByStatus('approved')" class="absence-card">
              <!-- Same card content as above -->
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Rejetées">
          <div class="absences-grid">
            <mat-card *ngFor="let absence of getAbsencesByStatus('rejected')" class="absence-card">
              <!-- Same card content as above -->
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .attendance-container {
      padding: 24px;
    }

    h1 {
      margin-bottom: 24px;
      color: #333;
    }

    .stats-section {
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .stat-item {
      text-align: center;
      padding: 16px;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
    }

    .stat-label {
      margin-top: 8px;
      color: #666;
    }

    mat-progress-bar {
      margin-top: 8px;
    }

    mat-progress-bar.warning {
      color: #ff9800;
    }

    mat-progress-bar.danger {
      color: #f44336;
    }

    .absences-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      padding: 24px 0;
    }

    .absence-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
      position: relative;
      padding-bottom: 48px;
    }

    .status-chip {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
      margin: 8px 0;
    }

    .status-chip.pending {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .status-chip.approved {
      background-color: #e8f5e9;
      color: #388e3c;
    }

    .status-chip.rejected {
      background-color: #ffebee;
      color: #d32f2f;
    }

    .absence-details {
      margin-top: 16px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #666;
    }

    .detail-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    mat-icon.pending { color: #f57c00; }
    mat-icon.approved { color: #388e3c; }
    mat-icon.rejected { color: #d32f2f; }

    mat-card-actions {
      padding: 16px;
      margin: 0;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class AttendanceListComponent implements OnInit, OnDestroy {
  absences: Absence[] = [];
  stats: AbsenceStats = {
    total: 0,
    justified: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    justifiedPercentage: 0
  };
  private subscription: Subscription | null = null;

  constructor(private absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.subscription = forkJoin({
      absences: this.absenceService.getAbsences(),
      justifiedPercentage: this.absenceService.getJustifiedAbsencePercentage()
    }).subscribe(result => {
      this.absences = result.absences.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      this.stats = {
        total: this.absences.length,
        justified: this.absences.filter(a => a.justified).length,
        pending: this.absences.filter(a => a.status === 'pending').length,
        approved: this.absences.filter(a => a.status === 'approved').length,
        rejected: this.absences.filter(a => a.status === 'rejected').length,
        justifiedPercentage: result.justifiedPercentage
      };
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getStatusClass(absence: Absence): string {
    return absence.status;
  }

  getStatusIcon(absence: Absence): string {
    switch (absence.status) {
      case 'pending':
        return 'pending';
      case 'approved':
        return 'check_circle';
      case 'rejected':
        return 'cancel';
      default:
        return 'help';
    }
  }

  getStatusLabel(absence: Absence): string {
    switch (absence.status) {
      case 'pending':
        return 'En attente';
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Rejetée';
      default:
        return '';
    }
  }

  getActionLabel(absence: Absence): string {
    switch (absence.status) {
      case 'pending':
        return 'Justifier';
      case 'approved':
        return 'Voir détails';
      case 'rejected':
        return 'Voir détails';
      default:
        return 'Voir détails';
    }
  }

  getAbsencesByStatus(status: Absence['status']): Absence[] {
    return this.absences.filter(a => a.status === status);
  }
} 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AssignmentService, Assignment } from '../../../services/assignment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="assignment-detail-container" *ngIf="assignment">
      <button mat-button color="primary" routerLink="/assignments">
        <mat-icon>arrow_back</mat-icon>
        Retour aux devoirs
      </button>

      <mat-card class="assignment-card">
        <mat-card-header>
          <mat-icon [ngClass]="getStatusClass(assignment)" matCardAvatar>
            {{ getStatusIcon(assignment) }}
          </mat-icon>
          <mat-card-title>{{ assignment.title }}</mat-card-title>
          <mat-card-subtitle>{{ assignment.subject }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <div class="status-section">
            <div class="status-chip" [ngClass]="getStatusClass(assignment)">
              {{ getStatusLabel(assignment) }}
            </div>
            <div class="due-date">
              Échéance: {{ assignment.dueDate | date:'fullDate' }}
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="description-section">
            <h3>Description</h3>
            <p>{{ assignment.description }}</p>
          </div>

          <mat-divider></mat-divider>

          <div class="timeline-section" *ngIf="assignment.status === 'pending'">
            <h3>Temps restant</h3>
            <mat-progress-bar
              mode="determinate"
              [value]="getRemainingTimePercentage(assignment)"
              [ngClass]="getTimelineClass(assignment)">
            </mat-progress-bar>
            <p class="timeline-text" [ngClass]="getTimelineClass(assignment)">
              {{ getRemainingTimeText(assignment) }}
            </p>
          </div>

          <div class="grade-section" *ngIf="assignment.status === 'graded'">
            <h3>Note et commentaires</h3>
            <div class="grade-display">
              <div class="grade-circle" [class.good-grade]="isGoodGrade(assignment)">
                {{ assignment.grade }}/100
              </div>
            </div>
            <p class="feedback" *ngIf="assignment.feedback">
              {{ assignment.feedback }}
            </p>
          </div>

          <div class="attachments-section" *ngIf="assignment.attachments?.length">
            <h3>Pièces jointes</h3>
            <div class="attachment-list">
              <a *ngFor="let attachment of assignment.attachments"
                 [href]="attachment"
                 target="_blank"
                 class="attachment-link">
                <mat-icon>attachment</mat-icon>
                {{ getAttachmentName(attachment) }}
              </a>
            </div>
          </div>
        </mat-card-content>

        <mat-card-actions>
          <ng-container [ngSwitch]="assignment.status">
            <button *ngSwitchCase="'pending'"
                    mat-raised-button
                    color="primary"
                    (click)="onSubmit()">
              Soumettre le devoir
            </button>
            <button *ngSwitchCase="'submitted'"
                    mat-button
                    disabled>
              Devoir soumis
            </button>
            <button *ngSwitchCase="'graded'"
                    mat-button
                    (click)="downloadGradedWork()">
              Télécharger le devoir corrigé
            </button>
          </ng-container>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .assignment-detail-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    .assignment-card {
      margin-top: 24px;
    }

    .status-section {
      margin: 16px 0;
    }

    .status-chip {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
      margin-right: 16px;
    }

    .status-chip.pending {
      background-color: #fff3e0;
      color: #f57c00;
    }

    .status-chip.submitted {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .status-chip.graded {
      background-color: #e8f5e9;
      color: #388e3c;
    }

    .due-date {
      display: inline-block;
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

    .timeline-section {
      margin: 24px 0;
    }

    .timeline-text {
      margin-top: 8px;
      font-size: 14px;
    }

    .timeline-text.urgent {
      color: #f44336;
    }

    .timeline-text.warning {
      color: #ff9800;
    }

    .timeline-text.normal {
      color: #4caf50;
    }

    .grade-section {
      text-align: center;
      margin: 24px 0;
    }

    .grade-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #f5f5f5;
      font-size: 24px;
      font-weight: bold;
      color: #666;
      margin-bottom: 16px;
    }

    .grade-circle.good-grade {
      background-color: #e8f5e9;
      color: #388e3c;
    }

    .feedback {
      font-style: italic;
      color: #666;
    }

    .attachments-section {
      margin: 24px 0;
    }

    .attachment-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .attachment-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1976d2;
      text-decoration: none;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .attachment-link:hover {
      background-color: #f5f5f5;
    }

    mat-icon.pending { color: #ff9800; }
    mat-icon.submitted { color: #2196f3; }
    mat-icon.graded { color: #4caf50; }

    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class AssignmentDetailComponent implements OnInit, OnDestroy {
  assignment: Assignment | null = null;
  private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.assignmentService.getAssignment(id).subscribe(
          assignment => this.assignment = assignment,
          error => {
            this.snackBar.open('Erreur lors du chargement du devoir', 'Fermer', {
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

  getStatusClass(assignment: Assignment): string {
    return assignment.status;
  }

  getStatusIcon(assignment: Assignment): string {
    switch (assignment.status) {
      case 'pending':
        return 'assignment';
      case 'submitted':
        return 'assignment_turned_in';
      case 'graded':
        return 'grade';
      default:
        return 'assignment';
    }
  }

  getStatusLabel(assignment: Assignment): string {
    switch (assignment.status) {
      case 'pending':
        return 'À faire';
      case 'submitted':
        return 'Soumis';
      case 'graded':
        return `Noté: ${assignment.grade}/100`;
      default:
        return '';
    }
  }

  getRemainingTimePercentage(assignment: Assignment): number {
    const now = new Date().getTime();
    const due = new Date(assignment.dueDate).getTime();
    const timeLeft = due - now;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.max(0, Math.min(100, (timeLeft / oneWeek) * 100));
  }

  getTimelineClass(assignment: Assignment): string {
    const percentage = this.getRemainingTimePercentage(assignment);
    if (percentage <= 25) return 'urgent';
    if (percentage <= 50) return 'warning';
    return 'normal';
  }

  getRemainingTimeText(assignment: Assignment): string {
    const now = new Date().getTime();
    const due = new Date(assignment.dueDate).getTime();
    const timeLeft = due - now;
    
    if (timeLeft <= 0) {
      return 'Date limite dépassée';
    }

    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

    if (days > 0) {
      return `${days} jour${days > 1 ? 's' : ''} et ${hours} heure${hours > 1 ? 's' : ''} restant${hours > 1 ? 's' : ''}`;
    }
    return `${hours} heure${hours > 1 ? 's' : ''} restant${hours > 1 ? 's' : ''}`;
  }

  isGoodGrade(assignment: Assignment): boolean {
    return (assignment.grade || 0) >= 70;
  }

  getAttachmentName(url: string): string {
    return url.split('/').pop() || url;
  }

  onSubmit(): void {
    if (!this.assignment) return;

    // TODO: Implement file upload dialog
    this.assignmentService.submitAssignment(this.assignment.id, { files: [] })
      .subscribe(
        () => {
          this.snackBar.open('Devoir soumis avec succès', 'Fermer', {
            duration: 3000
          });
          // Refresh the assignment
          this.assignmentService.getAssignment(this.assignment!.id)
            .subscribe(assignment => this.assignment = assignment);
        },
        error => {
          this.snackBar.open('Erreur lors de la soumission du devoir', 'Fermer', {
            duration: 3000
          });
        }
      );
  }

  downloadGradedWork(): void {
    // TODO: Implement download functionality
    this.snackBar.open('Téléchargement du devoir corrigé...', 'Fermer', {
      duration: 3000
    });
  }
} 
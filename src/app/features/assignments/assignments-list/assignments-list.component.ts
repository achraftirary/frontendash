import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AssignmentService, Assignment } from '../../../services/assignment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assignments-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="assignments-container">
      <h1>Mes Devoirs</h1>

      <div class="assignments-grid">
        <mat-card *ngFor="let assignment of assignments" class="assignment-card">
          <mat-card-header>
            <mat-icon [ngClass]="getStatusClass(assignment)" matCardAvatar>
              {{ getStatusIcon(assignment) }}
            </mat-icon>
            <mat-card-title>{{ assignment.title }}</mat-card-title>
            <mat-card-subtitle>{{ assignment.subject }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <p>{{ assignment.description }}</p>
            
            <div class="status-chip" [ngClass]="getStatusClass(assignment)">
              {{ getStatusLabel(assignment) }}
            </div>

            <div class="due-date">
              Échéance: {{ assignment.dueDate | date:'shortDate' }}
            </div>

            <mat-progress-bar
              *ngIf="assignment.status === 'pending'"
              mode="determinate"
              [value]="getRemainingTimePercentage(assignment)"
              [ngClass]="getTimelineClass(assignment)">
            </mat-progress-bar>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/assignments', assignment.id]">
              {{ getActionButtonLabel(assignment) }}
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .assignments-container {
      padding: 24px;
    }

    h1 {
      margin-bottom: 24px;
      color: #333;
    }

    .assignments-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    .assignment-card {
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

    .status-chip.submitted {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .status-chip.graded {
      background-color: #e8f5e9;
      color: #388e3c;
    }

    .due-date {
      font-size: 14px;
      color: #666;
      margin: 8px 0;
    }

    mat-progress-bar {
      margin-top: 16px;
    }

    mat-progress-bar.urgent {
      color: #f44336;
    }

    mat-progress-bar.warning {
      color: #ff9800;
    }

    mat-progress-bar.normal {
      color: #4caf50;
    }

    mat-icon.pending { color: #ff9800; }
    mat-icon.submitted { color: #2196f3; }
    mat-icon.graded { color: #4caf50; }

    mat-card-actions {
      padding: 16px;
      margin: 0;
    }
  `]
})
export class AssignmentsListComponent implements OnInit, OnDestroy {
  assignments: Assignment[] = [];
  private subscription: Subscription | null = null;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.subscription = this.assignmentService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments.sort((a, b) => {
          // Sort by status (pending first) then by due date
          if (a.status === 'pending' && b.status !== 'pending') return -1;
          if (a.status !== 'pending' && b.status === 'pending') return 1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
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

  getActionButtonLabel(assignment: Assignment): string {
    switch (assignment.status) {
      case 'pending':
        return 'Soumettre';
      case 'submitted':
        return 'Voir détails';
      case 'graded':
        return 'Voir note';
      default:
        return 'Voir détails';
    }
  }
} 
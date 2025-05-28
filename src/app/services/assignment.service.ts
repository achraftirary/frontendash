import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  attachments?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private mockAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Analyse Mathématique - Devoir 1',
      description: 'Exercices sur les limites et la continuité',
      subject: 'Mathématiques',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '2',
      title: 'Algorithmes de Tri',
      description: 'Implémentation des algorithmes de tri QuickSort et MergeSort',
      subject: 'Informatique',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'pending'
    },
    {
      id: '3',
      title: 'Mécanique Quantique',
      description: 'Résolution de l\'équation de Schrödinger',
      subject: 'Physique',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'submitted'
    },
    {
      id: '4',
      title: 'Statistiques Descriptives',
      description: 'Analyse de données et représentations graphiques',
      subject: 'Statistiques',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'graded',
      grade: 85,
      feedback: 'Excellent travail sur l\'analyse des données'
    }
  ];

  constructor() {}

  getAssignments(): Observable<Assignment[]> {
    if (environment.mockEnabled) {
      return of(this.mockAssignments).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getAssignment(id: string): Observable<Assignment> {
    if (environment.mockEnabled) {
      const assignment = this.mockAssignments.find(a => a.id === id);
      if (!assignment) {
        return throwError(() => new Error('Assignment not found'));
      }
      return of(assignment).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  submitAssignment(id: string, submission: { files: File[] }): Observable<void> {
    if (environment.mockEnabled) {
      const assignment = this.mockAssignments.find(a => a.id === id);
      if (!assignment) {
        return throwError(() => new Error('Assignment not found'));
      }
      assignment.status = 'submitted';
      return of(void 0).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getPendingAssignments(): Observable<Assignment[]> {
    if (environment.mockEnabled) {
      const pending = this.mockAssignments.filter(a => a.status === 'pending');
      return of(pending).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getSubmittedAssignments(): Observable<Assignment[]> {
    if (environment.mockEnabled) {
      const submitted = this.mockAssignments.filter(a => a.status === 'submitted');
      return of(submitted).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getGradedAssignments(): Observable<Assignment[]> {
    if (environment.mockEnabled) {
      const graded = this.mockAssignments.filter(a => a.status === 'graded');
      return of(graded).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }
} 
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Absence {
  id: string;
  date: Date;
  subject: string;
  duration: number; // in hours
  justified: boolean;
  justification?: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private mockAbsences: Absence[] = [
    {
      id: '1',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      subject: 'Mathématiques',
      duration: 2,
      justified: true,
      justification: 'Certificat médical',
      status: 'approved'
    },
    {
      id: '2',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      subject: 'Informatique',
      duration: 3,
      justified: false,
      status: 'pending'
    },
    {
      id: '3',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      subject: 'Physique',
      duration: 2,
      justified: false,
      status: 'rejected'
    },
    {
      id: '4',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      subject: 'Statistiques',
      duration: 1,
      justified: true,
      justification: 'Participation à un événement universitaire',
      status: 'approved'
    }
  ];

  constructor() {}

  getAbsences(): Observable<Absence[]> {
    if (environment.mockEnabled) {
      return of(this.mockAbsences).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getAbsence(id: string): Observable<Absence> {
    if (environment.mockEnabled) {
      const absence = this.mockAbsences.find(a => a.id === id);
      if (!absence) {
        return throwError(() => new Error('Absence not found'));
      }
      return of(absence).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  submitJustification(id: string, justification: string): Observable<void> {
    if (environment.mockEnabled) {
      const absence = this.mockAbsences.find(a => a.id === id);
      if (!absence) {
        return throwError(() => new Error('Absence not found'));
      }
      absence.justified = true;
      absence.justification = justification;
      absence.status = 'pending';
      return of(void 0).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getAbsencesByStatus(status: Absence['status']): Observable<Absence[]> {
    if (environment.mockEnabled) {
      const absences = this.mockAbsences.filter(a => a.status === status);
      return of(absences).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getAbsencesBySubject(subject: string): Observable<Absence[]> {
    if (environment.mockEnabled) {
      const absences = this.mockAbsences.filter(a => a.subject === subject);
      return of(absences).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getTotalAbsenceHours(): Observable<number> {
    if (environment.mockEnabled) {
      const total = this.mockAbsences.reduce((acc, curr) => acc + curr.duration, 0);
      return of(total).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getJustifiedAbsencePercentage(): Observable<number> {
    if (environment.mockEnabled) {
      const justified = this.mockAbsences.filter(a => a.justified).length;
      const total = this.mockAbsences.length;
      const percentage = (justified / total) * 100;
      return of(percentage).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }
} 
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: 'document' | 'video' | 'link';
  url: string;
  uploadDate: Date;
  size?: string;
  duration?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private mockResources: Resource[] = [
    {
      id: '1',
      title: 'Cours d\'Analyse - Chapitre 1',
      description: 'Introduction aux limites et à la continuité',
      subject: 'Mathématiques',
      type: 'document',
      url: '/assets/docs/analyse_ch1.pdf',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Tutoriel Algorithmes de Tri',
      description: 'Vidéo explicative sur les algorithmes de tri',
      subject: 'Informatique',
      type: 'video',
      url: 'https://youtube.com/watch?v=example',
      uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      duration: '15:30'
    },
    {
      id: '3',
      title: 'Documentation Python',
      description: 'Lien vers la documentation officielle Python',
      subject: 'Informatique',
      type: 'link',
      url: 'https://docs.python.org',
      uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'Exercices de Statistiques',
      description: 'Série d\'exercices sur les statistiques descriptives',
      subject: 'Statistiques',
      type: 'document',
      url: '/assets/docs/stats_exercises.pdf',
      uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      size: '1.8 MB'
    }
  ];

  constructor() {}

  getResources(): Observable<Resource[]> {
    if (environment.mockEnabled) {
      return of(this.mockResources).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getResource(id: string): Observable<Resource> {
    if (environment.mockEnabled) {
      const resource = this.mockResources.find(r => r.id === id);
      if (!resource) {
        return throwError(() => new Error('Resource not found'));
      }
      return of(resource).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getResourcesBySubject(subject: string): Observable<Resource[]> {
    if (environment.mockEnabled) {
      const resources = this.mockResources.filter(r => r.subject === subject);
      return of(resources).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getRecentResources(limit: number = 5): Observable<Resource[]> {
    if (environment.mockEnabled) {
      const sorted = [...this.mockResources]
        .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
        .slice(0, limit);
      return of(sorted).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }

  getResourcesByType(type: Resource['type']): Observable<Resource[]> {
    if (environment.mockEnabled) {
      const resources = this.mockResources.filter(r => r.type === type);
      return of(resources).pipe(delay(500));
    }
    return throwError(() => new Error('Not implemented'));
  }
} 
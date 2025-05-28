import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  { 
    path: '', 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.StudentDashboardComponent)
      },
      { 
        path: 'assignments', 
        loadComponent: () => import('./assignments/assignments.component').then(m => m.StudentAssignmentsComponent)
      },
      { 
        path: 'resources', 
        loadComponent: () => import('./resources/resources.component').then(m => m.StudentResourcesComponent)
      },
      { 
        path: 'absences', 
        loadComponent: () => import('./absences/absences.component').then(m => m.StudentAbsencesComponent)
      },
      { 
        path: 'documents', 
        loadComponent: () => import('./documents/documents.component').then(m => m.StudentDocumentsComponent)
      }
    ]
  }
]; 
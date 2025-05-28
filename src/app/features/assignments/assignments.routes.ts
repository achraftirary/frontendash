import { Routes } from '@angular/router';

export const ASSIGNMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./assignments-list/assignments-list.component').then(m => m.AssignmentsListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./assignment-detail/assignment-detail.component').then(m => m.AssignmentDetailComponent)
  }
]; 
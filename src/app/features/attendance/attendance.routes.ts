import { Routes } from '@angular/router';

export const ATTENDANCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./attendance-list/attendance-list.component').then(m => m.AttendanceListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./attendance-detail/attendance-detail.component').then(m => m.AttendanceDetailComponent)
  }
]; 
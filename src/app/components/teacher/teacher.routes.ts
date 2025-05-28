import { Routes } from '@angular/router';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.TeacherDashboardComponent)
      },
      {
        path: 'grades',
        loadComponent: () => import('./grades/grades.component').then(m => m.TeacherGradesComponent)
      },
      {
        path: 'resources',
        loadComponent: () => import('./resources/resources.component').then(m => m.TeacherResourcesComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./attendance/attendance.component').then(m => m.TeacherAttendanceComponent)
      }
    ]
  }
]; 
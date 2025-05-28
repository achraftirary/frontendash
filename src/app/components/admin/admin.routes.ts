import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./user-management/user-management.component').then(m => m.AdminUserManagementComponent)
      },
      {
        path: 'documents',
        loadComponent: () => import('./document-management/document-management.component').then(m => m.AdminDocumentManagementComponent)
      }
    ]
  }
]; 
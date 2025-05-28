import { Routes } from '@angular/router';
import { UserRole } from './models/user.model';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { MainLayoutComponent } from './components/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Connexion - INSEA App'
      },
      {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent),
        title: 'Inscription - INSEA App'
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [() => authGuard()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard - INSEA App'
      },
      {
        path: 'courses',
        loadComponent: () => import('./pages/courses/courses.component').then(m => m.CoursesComponent),
        title: 'Courses - INSEA App'
      },
      {
        path: 'resources',
        loadComponent: () => import('./pages/resources/resources.component').then(m => m.ResourcesComponent),
        title: 'Resources - INSEA App'
      },
      {
        path: 'calendar',
        loadComponent: () => import('./pages/calendar/calendar.component').then(m => m.CalendarComponent),
        title: 'Calendar - INSEA App'
      },
      {
        path: 'library',
        loadComponent: () => import('./pages/library/library.component').then(m => m.LibraryComponent),
        title: 'Library - INSEA App'
      },
      {
        path: 'messaging',
        loadComponent: () => import('./pages/messaging/messaging.component').then(m => m.MessagingComponent),
        title: 'Messaging - INSEA App'
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile - INSEA App'
      },
      {
        path: 'student',
        canActivate: [() => roleGuard([UserRole.ETUDIANT])],
        loadChildren: () => import('./components/student/student.routes').then(m => m.STUDENT_ROUTES)
      },
      {
        path: 'teacher',
        canActivate: [() => roleGuard([UserRole.PROFESSEUR])],
        loadChildren: () => import('./components/teacher/teacher.routes').then(m => m.TEACHER_ROUTES)
      },
      {
        path: 'admin',
        canActivate: [() => roleGuard([UserRole.ADMIN])],
        loadChildren: () => import('./components/admin/admin.routes').then(m => m.ADMIN_ROUTES)
      }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./components/shared/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
    title: 'Unauthorized - INSEA App'
  },
  {
    path: '**',
    loadComponent: () => import('./components/shared/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 Not Found - INSEA App'
  }
];

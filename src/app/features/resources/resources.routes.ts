import { Routes } from '@angular/router';

export const RESOURCES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./resources-list/resources-list.component').then(m => m.ResourcesListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./resource-detail/resource-detail.component').then(m => m.ResourceDetailComponent)
  }
]; 
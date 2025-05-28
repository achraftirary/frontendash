import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { AssignmentService } from './services/assignment.service';
import { ResourceService } from './services/resource.service';
import { AbsenceService } from './services/absence.service';
import { NotificationService } from './services/notification.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { mockInterceptorFn } from './interceptors/mock.interceptor';

// Material Imports
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
    importProvidersFrom(
      MatSnackBarModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatProgressBarModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatMenuModule,
      MatDividerModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTooltipModule,
      MatBadgeModule,
      MatChipsModule,
      MatExpansionModule,
      MatTabsModule
    ),
    AuthService,
    AssignmentService,
    ResourceService,
    AbsenceService,
    NotificationService
  ]
};

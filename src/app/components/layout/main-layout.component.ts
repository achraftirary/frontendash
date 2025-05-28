import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  template: `
    <div class="layout-container">
      <mat-toolbar class="toolbar">
        <button mat-icon-button (click)="drawer.toggle()" matTooltip="Menu">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="brand" routerLink="/dashboard">
          <img src="assets/images/insea-logo.png" alt="INSEA Logo" class="logo">
          <span class="app-title">INSEA App</span>
        </div>
        <span class="toolbar-spacer"></span>
        <div class="toolbar-actions">
          <button mat-icon-button matTooltip="Notifications" matBadge="4" matBadgeColor="warn" class="notification-btn">
            <mat-icon>notifications</mat-icon>
          </button>
          <button mat-icon-button matTooltip="Messages" matBadge="2" matBadgeColor="accent" class="message-btn">
            <mat-icon>chat</mat-icon>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="userMenu" class="user-button" matTooltip="Menu utilisateur">
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
        <mat-menu #userMenu="matMenu" class="user-menu">
          <div class="user-menu-header">
            <mat-icon class="avatar-icon">account_circle</mat-icon>
            <div class="user-info">
              <h4>{{ userName }}</h4>
              <p>{{ userRole }}</p>
            </div>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item routerLink="/profile" (click)="navigateTo('/profile')">
            <mat-icon>person</mat-icon>
            <span>Mon Profil</span>
          </button>
          <button mat-menu-item routerLink="/settings" (click)="navigateTo('/settings')">
            <mat-icon>settings</mat-icon>
            <span>Paramètres</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="handleLogout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Déconnexion</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer class="sidenav" [mode]="'side'" [opened]="true">
          <div class="user-profile-brief">
            <mat-icon class="user-avatar">account_circle</mat-icon>
            <div class="user-brief-info">
              <h3>{{ userName }}</h3>
              <p>{{ userRole }}</p>
            </div>
          </div>
          <mat-divider></mat-divider>
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              <mat-icon matListIcon>dashboard</mat-icon>
              <span matListItemTitle>Tableau de bord</span>
            </a>
            
            <a mat-list-item routerLink="/courses" routerLinkActive="active">
              <mat-icon matListIcon>school</mat-icon>
              <span matListItemTitle>Cours</span>
            </a>

            <a mat-list-item routerLink="/assignments" routerLinkActive="active">
              <mat-icon matListIcon>assignment</mat-icon>
              <span matListItemTitle>Devoirs</span>
            </a>

            <a mat-list-item routerLink="/calendar" routerLinkActive="active">
              <mat-icon matListIcon>calendar_today</mat-icon>
              <span matListItemTitle>Calendrier</span>
            </a>

            <a mat-list-item routerLink="/messaging" routerLinkActive="active">
              <mat-icon matListIcon>message</mat-icon>
              <span matListItemTitle>Messages</span>
            </a>

            <a mat-list-item routerLink="/resources" routerLinkActive="active">
              <mat-icon matListIcon>library_books</mat-icon>
              <span matListItemTitle>Ressources</span>
            </a>

            <ng-container *ngIf="userRole === 'ADMIN'">
              <mat-divider></mat-divider>
              <div class="nav-section">Administration</div>
              <a mat-list-item routerLink="/admin/dashboard" routerLinkActive="active">
                <mat-icon matListIcon>admin_panel_settings</mat-icon>
                <span matListItemTitle>Tableau de bord</span>
              </a>
              <a mat-list-item routerLink="/admin/users" routerLinkActive="active">
                <mat-icon matListIcon>people</mat-icon>
                <span matListItemTitle>Utilisateurs</span>
              </a>
              <a mat-list-item routerLink="/admin/courses" routerLinkActive="active">
                <mat-icon matListIcon>library_books</mat-icon>
                <span matListItemTitle>Cours</span>
              </a>
            </ng-container>

            <ng-container *ngIf="userRole === 'PROFESSEUR'">
              <mat-divider></mat-divider>
              <div class="nav-section">Espace Professeur</div>
              <a mat-list-item routerLink="/teacher/dashboard" routerLinkActive="active">
                <mat-icon matListIcon>assignment_ind</mat-icon>
                <span matListItemTitle>Tableau de bord</span>
              </a>
              <a mat-list-item routerLink="/teacher/courses" routerLinkActive="active">
                <mat-icon matListIcon>class</mat-icon>
                <span matListItemTitle>Mes cours</span>
              </a>
              <a mat-list-item routerLink="/teacher/students" routerLinkActive="active">
                <mat-icon matListIcon>groups</mat-icon>
                <span matListItemTitle>Mes étudiants</span>
              </a>
            </ng-container>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content-container">
            <ng-content></ng-content>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #f8f9fa;
    }

    .toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      background-color: #ffffff;
      color: #2e7d32;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0 16px;
      height: 64px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-left: 8px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      
      &:hover {
        opacity: 0.9;
      }
    }

    .logo {
      height: 40px;
      width: auto;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }

    .app-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2e7d32;
      letter-spacing: 0.5px;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        transition: transform 0.2s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .notification-btn, .message-btn {
      color: #2e7d32;
    }

    .user-button {
      margin-left: 8px;
      color: #2e7d32;
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .sidenav {
      width: 280px;
      background: white;
      border-right: none;
      box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    }

    .user-profile-brief {
      padding: 24px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      color: white;

      .user-avatar {
        font-size: 40px;
        height: 40px;
        width: 40px;
      }

      .user-brief-info {
        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
        }

        p {
          margin: 4px 0 0;
          font-size: 0.8rem;
          opacity: 0.9;
        }
      }
    }

    .content-container {
      padding: 24px;
      background-color: #f8f9fa;
      min-height: calc(100vh - 64px);
    }

    mat-nav-list {
      padding: 16px;
    }

    .nav-section {
      padding: 16px 16px 8px;
      color: #2e7d32;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    a.mat-list-item {
      margin: 4px 0;
      border-radius: 8px;
      height: 48px;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: rgba(46, 125, 50, 0.05);
        transform: translateX(4px);

        mat-icon {
          color: #2e7d32;
        }
      }

      mat-icon {
        color: #666;
        transition: color 0.3s ease;
      }

      span {
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .active {
      background-color: rgba(46, 125, 50, 0.1) !important;
      color: #2e7d32 !important;
      border-left: 4px solid #2e7d32;
      transform: translateX(4px);

      mat-icon {
        color: #2e7d32 !important;
      }
    }

    mat-divider {
      margin: 16px 0;
    }

    .user-menu {
      min-width: 280px;
    }

    .user-menu-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
      color: white;
      border-radius: 4px 4px 0 0;

      .avatar-icon {
        font-size: 40px;
        height: 40px;
        width: 40px;
        color: white;
      }

      .user-info {
        h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
        }

        p {
          margin: 4px 0 0;
          font-size: 0.8rem;
          opacity: 0.9;
        }
      }
    }

    ::ng-deep {
      .mat-mdc-menu-content {
        padding: 0 !important;
      }

      .mat-mdc-menu-item {
        font-size: 0.9rem !important;
        height: 48px !important;
        transition: background-color 0.3s ease;

        mat-icon {
          color: #2e7d32;
          margin-right: 12px;
        }

        &:hover {
          background-color: rgba(46, 125, 50, 0.05) !important;
        }
      }
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 240px;
      }

      .content-container {
        padding: 16px;
      }
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer: any;
  userName = '';
  userRole = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userName = `${currentUser.prenom} ${currentUser.nom}`;
      this.userRole = currentUser.role;
    }
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.snackBar.open('Déconnexion réussie', 'Fermer', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
} 
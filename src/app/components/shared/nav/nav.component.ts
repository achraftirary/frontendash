import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';
import { NotificationsComponent } from '../notifications/notifications.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    NotificationsComponent
  ],
  template: `
    <mat-toolbar class="navbar">
      <div class="navbar-brand">
        <button mat-icon-button (click)="toggleSidenav()" *ngIf="isLoggedIn()">
          <mat-icon>menu</mat-icon>
        </button>
        <div class="brand-container" routerLink="/">
          <span class="brand-text">INSEA</span>
          <span class="brand-accent">App</span>
          <div class="brand-dot"></div>
        </div>
      </div>

      <div class="navbar-menu">
        <ng-container *ngIf="isLoggedIn(); else loginButton">
          <app-notifications></app-notifications>
          
          <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-button">
            <mat-icon>account_circle</mat-icon>
            <span class="username">{{ getCurrentUser()?.prenom || 'Menu' }}</span>
            <mat-icon>arrow_drop_down</mat-icon>
          </button>
          
          <mat-menu #userMenu="matMenu" class="user-menu">
            <div class="user-menu-header">
              <mat-icon class="avatar-icon">account_circle</mat-icon>
              <div class="user-info">
                <h4>{{ getCurrentUser()?.prenom }} {{ getCurrentUser()?.nom }}</h4>
                <p>{{ getCurrentUser()?.email }}</p>
              </div>
            </div>
            
            <mat-divider></mat-divider>
            
            <button mat-menu-item routerLink="/profile">
              <mat-icon>person</mat-icon>
              <span>Profile</span>
            </button>
            
            <button mat-menu-item routerLink="/settings">
              <mat-icon>settings</mat-icon>
              <span>Paramètres</span>
            </button>
            
            <mat-divider></mat-divider>
            
            <button mat-menu-item (click)="logout()" class="logout-button">
              <mat-icon>exit_to_app</mat-icon>
              <span>Déconnexion</span>
            </button>
          </mat-menu>
        </ng-container>
        
        <ng-template #loginButton>
          <button mat-button routerLink="/auth/login" class="login-button">
            <mat-icon>login</mat-icon>
            <span>Connexion</span>
          </button>
        </ng-template>
      </div>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container" *ngIf="isLoggedIn()">
      <mat-sidenav #sidenav mode="side" [opened]="sidenavOpen" class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Tableau de bord</span>
          </a>

          <a mat-list-item routerLink="/courses" routerLinkActive="active">
            <mat-icon matListItemIcon>school</mat-icon>
            <span matListItemTitle>Cours</span>
          </a>

          <a mat-list-item routerLink="/assignments" routerLinkActive="active">
            <mat-icon matListItemIcon>assignment</mat-icon>
            <span matListItemTitle>Devoirs</span>
          </a>

          <a mat-list-item routerLink="/resources" routerLinkActive="active">
            <mat-icon matListItemIcon>library_books</mat-icon>
            <span matListItemTitle>Ressources</span>
          </a>

          <mat-divider></mat-divider>

          <a mat-list-item routerLink="/calendar" routerLinkActive="active">
            <mat-icon matListItemIcon>event</mat-icon>
            <span matListItemTitle>Calendrier</span>
          </a>

          <a mat-list-item routerLink="/messaging" routerLinkActive="active">
            <mat-icon matListItemIcon>message</mat-icon>
            <span matListItemTitle>Messagerie</span>
          </a>

          <a mat-list-item routerLink="/attendance" routerLinkActive="active">
            <mat-icon matListItemIcon>event_note</mat-icon>
            <span matListItemTitle>Absences</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content [class.with-sidenav]="sidenavOpen">
        <div class="main-content">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      padding: 0 24px;
      background: var(--gradient-primary);
      box-shadow: 0 2px 15px rgba(76, 175, 80, 0.2);
      height: 64px;
      transition: all var(--transition-speed) ease;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand-container {
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
      cursor: pointer;
      transition: transform var(--transition-speed) ease;
      text-decoration: none;
    }

    .brand-container:hover {
      transform: translateX(4px);
    }

    .brand-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .brand-accent {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--accent-color);
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      background-color: var(--accent-color);
      border-radius: 50%;
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: translateY(-50%) scale(1); opacity: 1; }
      50% { transform: translateY(-50%) scale(1.5); opacity: 0.5; }
      100% { transform: translateY(-50%) scale(1); opacity: 1; }
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .user-menu-button {
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px;
      border-radius: 24px;
      transition: all var(--transition-speed) ease;
    }

    .user-menu-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .username {
      font-weight: 500;
    }

    .user-menu {
      min-width: 280px;
    }

    .user-menu-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--primary-color);
    }

    .user-info h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .user-info p {
      margin: 4px 0 0;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .login-button {
      color: white;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 16px;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all var(--transition-speed) ease;
    }

    .login-button:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }

    .sidenav-container {
      flex: 1;
      margin-top: 64px;
    }

    .sidenav {
      width: 280px;
      background-color: var(--surface-color);
      border-right: 1px solid rgba(0, 0, 0, 0.05);
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    }

    .mat-drawer-side {
      border: none;
    }

    mat-nav-list {
      padding-top: 16px;
    }

    mat-nav-list a {
      margin: 4px 8px;
      border-radius: 8px;
      transition: all var(--transition-speed) ease;
    }

    mat-nav-list a:hover {
      background-color: rgba(76, 175, 80, 0.05);
    }

    mat-nav-list a.active {
      background-color: rgba(76, 175, 80, 0.1);
      color: var(--primary-color);
    }

    mat-nav-list mat-icon {
      color: var(--text-secondary);
      transition: color var(--transition-speed) ease;
    }

    mat-nav-list a.active mat-icon {
      color: var(--primary-color);
    }

    mat-divider {
      margin: 16px 0;
    }

    .with-sidenav {
      margin-left: 280px;
    }

    .main-content {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
      animation: fadeIn 0.5s ease-out;
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 0 16px;
      }

      .brand-text, .brand-accent {
        font-size: 1.25rem;
      }

      .username {
        display: none;
      }

      .sidenav {
        width: 240px;
      }

      .with-sidenav {
        margin-left: 240px;
      }

      .main-content {
        padding: 16px;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class NavComponent {
  sidenavOpen = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }

  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
} 
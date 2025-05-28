import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserResponse } from '../../../models/user.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('navbarScroll', [
      state('top', style({
        backgroundColor: 'transparent',
        backdropFilter: 'blur(0)',
        boxShadow: 'none'
      })),
      state('scrolled', style({
        backgroundColor: 'rgba(76, 175, 80, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      })),
      transition('top <=> scrolled', animate('0.3s ease-in-out'))
    ])
  ],
  template: `
    <nav class="navbar navbar-expand-lg" [@navbarScroll]="navbarState">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <div class="brand-container">
            <span class="brand-text">INSEA</span>
            <span class="brand-accent">App</span>
            <div class="brand-dot"></div>
          </div>
        </a>
        
        <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <div class="toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <ng-container *ngIf="currentUser">
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                  <i class="fas fa-chart-line"></i>
                  <span>Dashboard</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/courses" routerLinkActive="active">
                  <i class="fas fa-graduation-cap"></i>
                  <span>Courses</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/calendar" routerLinkActive="active">
                  <i class="fas fa-calendar-alt"></i>
                  <span>Calendar</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/messaging" routerLinkActive="active">
                  <i class="fas fa-comments"></i>
                  <span>Messages</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/library" routerLinkActive="active">
                  <i class="fas fa-book"></i>
                  <span>Library</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/profile" routerLinkActive="active">
                  <i class="fas fa-user-circle"></i>
                  <span>Profile</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link logout-link" href="#" (click)="logout($event)">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
            </ng-container>
            <ng-container *ngIf="!currentUser">
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/login" routerLinkActive="active">
                  <i class="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
              <li class="nav-item" @fadeInOut>
                <a class="nav-link" routerLink="/register" routerLinkActive="active">
                  <i class="fas fa-user-plus"></i>
                  <span>Register</span>
                  <div class="nav-link-highlight"></div>
                </a>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(to right, var(--primary-dark), var(--primary-color));
      padding: 1rem;
      transition: all 0.3s ease;
      position: fixed;
      width: 100%;
      top: 0;
      z-index: 1000;
    }

    .brand-container {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .brand-text, .brand-accent {
      font-weight: 600;
      font-size: 1.8rem;
      letter-spacing: 0.5px;
    }

    .brand-text {
      color: white;
      font-family: 'Poppins', sans-serif;
    }

    .brand-accent {
      color: var(--accent-color);
      margin-left: 4px;
    }

    .brand-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: var(--accent-color);
      border-radius: 50%;
      right: -12px;
      top: 8px;
      animation: pulse 2s infinite;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 500;
      font-size: 1.1rem;
      padding: 0.75rem 1.25rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
    }

    .nav-link:hover {
      color: white !important;
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    .nav-link.active {
      color: white !important;
      background-color: rgba(255, 255, 255, 0.15);
    }

    .nav-link i {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
    }

    .nav-link:hover i {
      transform: scale(1.1);
    }

    .nav-link-highlight {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    .nav-link:hover .nav-link-highlight,
    .nav-link.active .nav-link-highlight {
      width: 80%;
    }

    .navbar-toggler {
      border: none;
      padding: 0;
      width: 40px;
      height: 40px;
      position: relative;
      background: transparent;
    }

    .toggler-icon {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
    }

    .toggler-icon span {
      display: block;
      width: 24px;
      height: 2px;
      background-color: white;
      transition: all 0.3s ease;
    }

    .navbar-toggler:hover .toggler-icon span {
      background-color: var(--accent-color);
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
      100% { transform: scale(1); opacity: 1; }
    }

    .container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .navbar-brand {
      position: relative;
      z-index: 1;
      margin-right: 1.5rem;
    }

    .navbar-collapse {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .navbar-nav {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .nav-item {
      margin: 0 3px;
      position: relative;
    }

    .logout-link:hover {
      background: rgba(244, 67, 54, 0.1);
    }

    .custom-toggler {
      display: none;
    }

    @media (max-width: 991px) {
      .custom-toggler {
        display: block;
        position: relative;
        z-index: 1;
      }

      .navbar-collapse {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: linear-gradient(to bottom, var(--primary-dark), var(--primary-color));
        backdrop-filter: blur(10px);
        border-radius: 0 0 16px 16px;
        padding: 1rem;
        margin-top: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: none;
      }

      .navbar-collapse.show {
        display: block;
      }

      .navbar-nav {
        flex-direction: column;
        width: 100%;
      }

      .nav-item {
        width: 100%;
        margin: 0;
      }

      .nav-link {
        padding: 1rem 1.5rem;
        border-radius: 8px;
      }

      .nav-item:last-child .nav-link {
        margin-bottom: 0;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: UserResponse | null = null;
  navbarState = 'top';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 20) {
      this.navbarState = 'scrolled';
    } else {
      this.navbarState = 'top';
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
} 
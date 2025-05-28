import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="login-container">
      <div class="login-content">
        <div class="logo-section">
          <img src="assets/images/insea-logo.png" alt="INSEA Logo" class="logo">
          <h1>INSEAApp</h1>
          <p class="subtitle">Bienvenue</p>
          <p class="description">Connectez-vous à votre compte</p>
        </div>

        <mat-card class="login-card">
          <mat-card-content>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" placeholder="Entrez votre email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                  L'email est requis
                </mat-error>
                <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                  Email invalide
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mot de passe</mat-label>
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Le mot de passe est requis
                </mat-error>
              </mat-form-field>

              <div class="form-options">
                <mat-checkbox formControlName="rememberMe">Se souvenir de moi</mat-checkbox>
                <a routerLink="/auth/forgot-password" class="forgot-password">Mot de passe oublié?</a>
              </div>

              <button mat-raised-button color="primary" type="submit" class="submit-button" [disabled]="!loginForm.valid || isLoading">
                <mat-icon>{{isLoading ? 'hourglass_empty' : 'login'}}</mat-icon>
                {{isLoading ? 'Connexion en cours...' : 'Se connecter'}}
              </button>
              <mat-progress-bar *ngIf="isLoading" mode="indeterminate" class="mt-3"></mat-progress-bar>
            </form>
          </mat-card-content>
        </mat-card>

        <div class="register-prompt">
          <span>Vous n'avez pas de compte?</span>
          <a routerLink="/auth/register" class="register-link">S'inscrire</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
      padding: 2rem;
    }

    .login-content {
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .logo-section {
      margin-bottom: 2rem;
      color: white;

      .logo {
        width: 120px;
        height: auto;
        margin-bottom: 1rem;
      }

      h1 {
        font-size: 2.5rem;
        margin: 0;
        font-weight: 500;
      }

      .subtitle {
        font-size: 1.5rem;
        margin: 0.5rem 0;
        opacity: 0.9;
      }

      .description {
        font-size: 1rem;
        opacity: 0.8;
        margin: 0;
      }
    }

    .login-card {
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    }

    mat-form-field {
      width: 100%;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;

      .forgot-password {
        color: var(--primary-color);
        text-decoration: none;
        font-size: 0.9rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .mt-3 {
      margin-top: 1rem;
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      mat-icon {
        margin: 0;
      }
    }

    .register-prompt {
      margin-top: 2rem;
      color: white;
      font-size: 0.9rem;

      .register-link {
        color: white;
        text-decoration: none;
        font-weight: 500;
        margin-left: 0.5rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    @media (max-width: 480px) {
      .login-container {
        padding: 1rem;
      }

      .login-card {
        padding: 1.5rem;
      }

      .logo-section {
        .logo {
          width: 100px;
        }

        h1 {
          font-size: 2rem;
        }
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Connexion réussie !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(error.message || 'Erreur de connexion', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }
}

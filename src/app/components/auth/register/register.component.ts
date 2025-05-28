import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="register-container">
      <div class="register-content">
        <div class="logo-section">
          <img src="assets/images/insea-logo.png" alt="INSEA Logo" class="logo">
          <h1>INSEAApp</h1>
          <p class="subtitle">Inscription</p>
          <p class="description">Créez votre compte INSEA</p>
        </div>

        <mat-card class="register-card">
          <mat-card-content>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" placeholder="Entrez votre email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                  L'email est requis
                </mat-error>
                <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                  Email invalide
                </mat-error>
              </mat-form-field>

              <div class="name-fields">
                <mat-form-field appearance="outline">
                  <mat-label>Nom</mat-label>
                  <input matInput formControlName="lastName" placeholder="Entrez votre nom">
                  <mat-icon matSuffix>person</mat-icon>
                  <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                    Le nom est requis
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Prénom</mat-label>
                  <input matInput formControlName="firstName" placeholder="Entrez votre prénom">
                  <mat-icon matSuffix>person</mat-icon>
                  <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                    Le prénom est requis
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="password-fields">
                <mat-form-field appearance="outline">
                  <mat-label>Mot de passe</mat-label>
                  <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
                  <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                    <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                  <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                    Le mot de passe est requis
                  </mat-error>
                  <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                    Le mot de passe doit contenir au moins 6 caractères
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Confirmer le mot de passe</mat-label>
                  <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="confirmPassword">
                  <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
                    La confirmation du mot de passe est requise
                  </mat-error>
                  <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('passwordMismatch')">
                    Les mots de passe ne correspondent pas
                  </mat-error>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Numéro de Carte Nationale</mat-label>
                <input matInput formControlName="cin" placeholder="Entrez votre CIN">
                <mat-icon matSuffix>badge</mat-icon>
                <mat-error *ngIf="registerForm.get('cin')?.hasError('required')">
                  Le numéro CIN est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Téléphone</mat-label>
                <input matInput formControlName="phone" placeholder="Entrez votre numéro">
                <mat-icon matSuffix>phone</mat-icon>
                <mat-error *ngIf="registerForm.get('phone')?.hasError('required')">
                  Le numéro de téléphone est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Date de Naissance</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="birthDate">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-error *ngIf="registerForm.get('birthDate')?.hasError('required')">
                  La date de naissance est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Genre</mat-label>
                <mat-select formControlName="gender">
                  <mat-option value="M">Masculin</mat-option>
                  <mat-option value="F">Féminin</mat-option>
                </mat-select>
                <mat-error *ngIf="registerForm.get('gender')?.hasError('required')">
                  Le genre est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Rôle</mat-label>
                <mat-select formControlName="role">
                  <mat-option value="ETUDIANT">Étudiant</mat-option>
                  <mat-option value="PROFESSEUR">Professeur</mat-option>
                </mat-select>
                <mat-error *ngIf="registerForm.get('role')?.hasError('required')">
                  Le rôle est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" *ngIf="registerForm.get('role')?.value === 'ETUDIANT'">
                <mat-label>Filière</mat-label>
                <mat-select formControlName="department">
                  <mat-option value="DATA_SCIENCE">Data Science</mat-option>
                  <mat-option value="ACTUARIAT">Actuariat</mat-option>
                  <mat-option value="STATISTIQUE">Statistique</mat-option>
                  <mat-option value="RECHERCHE_OPERATIONNELLE">Recherche Opérationnelle</mat-option>
                </mat-select>
                <mat-error *ngIf="registerForm.get('department')?.hasError('required')">
                  La filière est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" *ngIf="registerForm.get('role')?.value === 'ETUDIANT'">
                <mat-label>Année</mat-label>
                <mat-select formControlName="year">
                  <mat-option value="1">1ère année</mat-option>
                  <mat-option value="2">2ème année</mat-option>
                  <mat-option value="3">3ème année</mat-option>
                </mat-select>
                <mat-error *ngIf="registerForm.get('year')?.hasError('required')">
                  L'année est requise
                </mat-error>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" class="submit-button" [disabled]="!registerForm.valid || isLoading">
                <mat-icon>{{isLoading ? 'hourglass_empty' : 'person_add'}}</mat-icon>
                {{isLoading ? 'Inscription en cours...' : 'S\'inscrire'}}
              </button>
              <mat-progress-bar *ngIf="isLoading" mode="indeterminate" class="mt-3"></mat-progress-bar>
            </form>
          </mat-card-content>
        </mat-card>

        <div class="login-prompt">
          <span>Vous avez déjà un compte?</span>
          <a routerLink="/auth/login" class="login-link">Se connecter</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
      padding: 2rem;
    }

    .register-content {
      width: 100%;
      max-width: 500px;
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

    .register-card {
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .password-fields,
      .name-fields {
        display: flex;
        gap: 1rem;
        
        mat-form-field {
          flex: 1;
        }
      }
    }

    mat-form-field {
      width: 100%;
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

    .login-prompt {
      margin-top: 2rem;
      color: white;
      font-size: 0.9rem;

      .login-link {
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
      .register-container {
        padding: 1rem;
      }

      .register-card {
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
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      cin: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['ETUDIANT', [Validators.required]],
      department: [''],
      year: ['']
    }, {
      validators: this.passwordMatchValidator
    });

    // Add conditional validation for department and year
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      const departmentControl = this.registerForm.get('department');
      const yearControl = this.registerForm.get('year');

      if (role === 'ETUDIANT') {
        departmentControl?.setValidators([Validators.required]);
        yearControl?.setValidators([Validators.required]);
      } else {
        departmentControl?.clearValidators();
        yearControl?.clearValidators();
      }

      departmentControl?.updateValueAndValidity();
      yearControl?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const formData = this.registerForm.value;
      const userData = {
        email: formData.email,
        motDePasse: formData.password,
        numeroCarteNationale: formData.cin,
        telephone: formData.phone,
        dateNaissance: formData.birthDate,
        genre: formData.gender,
        role: formData.role,
        filiere: formData.department || 'N/A',
        annee: formData.year || 'N/A',
        nom: formData.lastName,
        prenom: formData.firstName
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open(error.message || 'Une erreur est survenue lors de l\'inscription.', 'Fermer', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }
}
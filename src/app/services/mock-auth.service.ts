import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, UserRole, UserResponse } from '../models/user.model';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private readonly MOCK_DELAY = 100;
  private readonly STORAGE_KEY = 'mock_users';
  private readonly TOKEN_KEY = 'token';
  private readonly CURRENT_USER_KEY = 'currentUser';
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(this.getCurrentUser());

  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Initialize mock users if none exist
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const defaultAdmin: User = {
        nom: 'Admin',
        prenom: 'User',
        email: 'admin@insea.ac.ma',
        motDePasse: 'Admin@2024',
        numeroCarteNationale: 'AD123456',
        filiere: 'ADMIN',
        annee: '2024',
        role: UserRole.ADMIN,
        telephone: '0600000000',
        dateNaissance: '1990-01-01',
        genre: 'M'
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([defaultAdmin]));
    }
  }

  private get mockUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private set mockUsers(users: User[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  register(userData: User): Observable<{ message: string }> {
    try {
      // Check if user already exists
      if (this.mockUsers.some(user => user.email === userData.email)) {
        return throwError(() => ({
          error: { message: 'Un utilisateur existe déjà avec cet email' }
        }));
      }

      // Add user to mock database
      const users = [...this.mockUsers, userData];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

      return of({ message: 'Compte créé avec succès' }).pipe(delay(this.MOCK_DELAY));
    } catch (error) {
      return throwError(() => ({
        error: { message: 'Une erreur est survenue lors de la création du compte' }
      }));
    }
  }

  login(credentials: { email: string; motDePasse: string }): Observable<AuthResponse> {
    try {
      const user = this.mockUsers.find(u => 
        u.email === credentials.email && u.motDePasse === credentials.motDePasse
      );

      if (!user) {
        return throwError(() => ({
          error: { message: 'Email ou mot de passe incorrect' }
        }));
      }

      // Create response without password
      const { motDePasse, ...userWithoutPassword } = user;
      const response: AuthResponse = {
        token: `mock_token_${Date.now()}`,
        user: { ...userWithoutPassword, id: Date.now().toString() } as UserResponse
      };

      // Store auth data
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);

      return of(response).pipe(delay(this.MOCK_DELAY));
    } catch (error) {
      return throwError(() => ({
        error: { message: 'Une erreur est survenue lors de la connexion' }
      }));
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): UserResponse | null {
    const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
} 
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, UserRole, UserResponse } from '../models/user.model';
import { AuthResponse, AuthError } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserResponse | null>(null);
  private mockUsers: User[] = [
    {
      email: environment.mockAdmin.email,
      nom: 'Admin',
      prenom: 'INSEA',
      role: UserRole.ADMIN,
      numeroCarteNationale: 'AD123456',
      filiere: 'ADMIN',
      annee: '2024',
      telephone: '0600000000',
      dateNaissance: '1990-01-01',
      genre: 'M',
      motDePasse: environment.mockAdmin.password
    },
    {
      email: 'prof@insea.ac.ma',
      nom: 'Professeur',
      prenom: 'INSEA',
      role: UserRole.PROFESSEUR,
      numeroCarteNationale: 'PR123456',
      filiere: 'DSE',
      annee: '2024',
      telephone: '0600000001',
      dateNaissance: '1985-01-01',
      genre: 'M',
      motDePasse: '123456'
    },
    {
      email: 'etudiant@insea.ac.ma',
      nom: 'Étudiant',
      prenom: 'INSEA',
      role: UserRole.ETUDIANT,
      numeroCarteNationale: 'ET123456',
      filiere: 'DSE',
      annee: '2024',
      telephone: '0600000002',
      dateNaissance: '2000-01-01',
      genre: 'M',
      motDePasse: '123456'
    }
  ];

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const user = this.mockUsers.find(u => u.email === email);

    if (user && (password === environment.mockAdmin.password || password === '123456')) {
      const { motDePasse, ...userWithoutPassword } = user;
      const response: AuthResponse = {
        token: `mock_token_${Date.now()}`,
        user: { ...userWithoutPassword, id: Date.now().toString() }
      };
      
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
      return of(response).pipe(delay(1000)); // Simulate network delay
    }

    return throwError(() => ({
      message: 'Email ou mot de passe incorrect'
    } as AuthError));
  }

  register(userData: Omit<User, 'id'>): Observable<AuthResponse> {
    // Check if user already exists
    if (this.mockUsers.some(u => u.email === userData.email)) {
      return throwError(() => ({
        message: 'Un utilisateur avec cet email existe déjà'
      } as AuthError));
    }

    // Add to mock users
    this.mockUsers = [...this.mockUsers, userData];

    // Create response
    const { motDePasse, ...userWithoutPassword } = userData;
    const response: AuthResponse = {
      token: `mock_token_${Date.now()}`,
      user: { ...userWithoutPassword, id: Date.now().toString() }
    };

    return of(response).pipe(delay(1000)); // Simulate network delay
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): UserResponse | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser$(): Observable<UserResponse | null> {
    return this.currentUserSubject.asObservable();
  }
} 